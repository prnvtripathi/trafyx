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

	cursor, err := collection.Find(ctx, bson.M{"user_api_id": objectID})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer cursor.Close(ctx)

	var results []models.TestResult
	if err = cursor.All(ctx, &results); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, results)
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
