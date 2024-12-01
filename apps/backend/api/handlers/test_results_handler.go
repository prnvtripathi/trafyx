package handlers

import (
	"backend/api/models"
	"backend/config"
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func AddTestResults(c *gin.Context) {
	// Raw incoming data
	var requestBody struct {
		Results []map[string]interface{} `json:"results"`
	}
	if err := c.ShouldBindJSON(&requestBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Parse into TestResult objects
	var results []models.TestResult
	for _, rawResult := range requestBody.Results {
		// Convert test_case_id from string to ObjectID
		testCaseIDStr, ok := rawResult["test_case_id"].(string)
		if !ok {
			c.JSON(http.StatusBadRequest, gin.H{"error": "test_case_id must be a string"})
			return
		}
		testCaseID, err := primitive.ObjectIDFromHex(testCaseIDStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid test_case_id format"})
			return
		}

		// Convert executed_at from float64 to primitive.DateTime
		executedAtFloat, ok := rawResult["executed_at"].(float64)
		if !ok {
			c.JSON(http.StatusBadRequest, gin.H{"error": "executed_at must be a float64"})
			return
		}
		executedAt := primitive.NewDateTimeFromTime(time.Unix(int64(executedAtFloat), 0))

		// Parse other fields
		result := models.TestResult{
			TestCaseID:      testCaseID,
			StatusCode:      int(rawResult["status_code"].(float64)), // Convert float64 to int
			Response:        rawResult["response"].(string),
			ExpectedOutcome: int(rawResult["expected_outcome"].(float64)), // Convert float64 to int
			TestResult:      rawResult["test_result"].(bool),
			Duration:        rawResult["duration"].(float64),
			ExecutedAt:      executedAt,
		}
		results = append(results, result)
	}

	// Insert into MongoDB
	collection := config.MongoDB.Collection("test_results")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var docs []interface{}
	for _, result := range results {
		docs = append(docs, bson.M{
			"test_case_id":     result.TestCaseID,
			"status_code":      result.StatusCode,
			"response":         result.Response,
			"expected_outcome": result.ExpectedOutcome,
			"test_result":      result.TestResult,
			"duration":         result.Duration,
			"executed_at":      result.ExecutedAt,
		})
	}

	_, err := collection.InsertMany(ctx, docs)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Test results added successfully"})
}

func GetTestResults(c *gin.Context) {
	userAPIID := c.Query("api_id")
	if userAPIID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "api_id is required"})
		return
	}

	collection := config.MongoDB.Collection("test_results")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Convert the userAPIID to an ObjectID
	objectID, err := primitive.ObjectIDFromHex(userAPIID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid api_id"})
		return
	}

	// Aggregation pipeline
	pipeline := mongo.Pipeline{
		// Step 1: Join test_results with test_cases
		{{Key: "$lookup", Value: bson.M{
			"from":         "test_cases",
			"localField":   "test_case_id",
			"foreignField": "_id",
			"as":           "test_case",
		}}},
		// Step 2: Unwind test_case array
		{{Key: "$unwind", Value: bson.M{
			"path":                       "$test_case",
			"preserveNullAndEmptyArrays": false,
		}}},
		// Step 3: Join test_cases with user_apis
		{{Key: "$lookup", Value: bson.M{
			"from":         "user_apis",
			"localField":   "test_case.apiid",
			"foreignField": "_id",
			"as":           "user_api",
		}}},
		// Step 4: Unwind user_api array
		{{Key: "$unwind", Value: bson.M{
			"path":                       "$user_api",
			"preserveNullAndEmptyArrays": false,
		}}},
		// Step 5: Match the user_api_id
		{{Key: "$match", Value: bson.M{
			"user_api._id": objectID,
		}}},
		// Step 6: Group by api_id to count test_cases and aggregate results
		{{Key: "$group", Value: bson.M{
			"_id": "$user_api._id",
			"test_results": bson.M{"$push": bson.M{
				"test_case":         "$test_case",
				"test_results_data": "$$ROOT",
			}},
			"test_cases_count": bson.M{"$sum": 1},
		}}},
	}

	// Execute the aggregation pipeline
	cursor, err := collection.Aggregate(ctx, pipeline)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer cursor.Close(ctx)

	// Prepare the final response
	var aggregatedResults []bson.M
	if err = cursor.All(ctx, &aggregatedResults); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Construct the response
	var response gin.H
	if len(aggregatedResults) > 0 {
		aggregatedResult := aggregatedResults[0]
		response = gin.H{
			"api_id":       userAPIID,
			"test_cases":   aggregatedResult["test_cases_count"],
			"test_results": aggregatedResult["test_results"],
		}
	} else {
		response = gin.H{
			"api_id":       userAPIID,
			"test_cases":   0,
			"test_results": []bson.M{},
		}
	}

	c.JSON(http.StatusOK, response)
}

func DeleteTestResults(c *gin.Context) {
	userAPIID := c.Query("user_api_id")
	if userAPIID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user_api_id is required"})
		return
	}

	collection := config.MongoDB.Collection("test_results")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	objectID, err := primitive.ObjectIDFromHex(userAPIID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user_api_id"})
		return
	}

	_, err = collection.DeleteMany(ctx, bson.M{"user_api_id": objectID})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Test results deleted successfully"})
}
