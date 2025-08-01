package handlers

import (
	"context"
	"net/http"
	"time"

	"trafyx/backend/config"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
)

func GetTestResults(c *gin.Context) {
	userAPIID := c.Param("id")
	if userAPIID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "api_id is required"})
		return
	}

	collection := config.MongoDB.Collection("test_results")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Convert the userAPIID to an ObjectID
	objectID, err := bson.ObjectIDFromHex(userAPIID)
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
			"localField":   "test_case.api_id",
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
		// Step 6: Project only the fields we need, removing redundant data
		{{Key: "$project", Value: bson.M{
			"_id":              1,
			"test_case_id":     1,
			"status_code":      1,
			"response":         1,
			"expected_outcome": 1,
			"test_result":      1,
			"duration":         1,
			"executed_at":      1,
			"run_count":        1,
			"test_case":        "$test_case",
			"user_api":         "$user_api",
		}}},
		// Step 7: Group by api_id to count test_cases and aggregate results
		{{Key: "$group", Value: bson.M{
			"_id":      "$user_api._id",
			"user_api": bson.M{"$first": "$user_api"},
			"test_results": bson.M{"$push": bson.M{
				"_id":              "$_id",
				"test_case_id":     "$test_case_id",
				"status_code":      "$status_code",
				"response":         "$response",
				"expected_outcome": "$expected_outcome",
				"test_result":      "$test_result",
				"duration":         "$duration",
				"executed_at":      "$executed_at",
				"run_count":        "$run_count",
				"test_case":        "$test_case",
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
			"user_api":     aggregatedResult["user_api"],
			"test_cases":   aggregatedResult["test_cases_count"],
			"test_results": aggregatedResult["test_results"],
		}
	} else {
		response = gin.H{
			"api_id":       userAPIID,
			"user_api":     nil,
			"test_cases":   0,
			"test_results": []bson.M{},
		}
	}

	c.JSON(http.StatusOK, response)
}

func DeleteTestResults(c *gin.Context) {
	userAPIID := c.Param("id")
	if userAPIID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user_api_id is required"})
		return
	}

	collection := config.MongoDB.Collection("test_results")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	objectID, err := bson.ObjectIDFromHex(userAPIID)
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

func GetAPIsWithTestResultsAvailable(c *gin.Context) {
	userID := c.Param("user_id")
	if userID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user_id is required"})
		return
	}

	collection := config.MongoDB.Collection("test_results")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Convert userID to ObjectID
	userObjectID, err := bson.ObjectIDFromHex(userID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user_id"})
		return
	}

	// Aggregation pipeline to get all APIs with test_results for this user
	pipeline := mongo.Pipeline{
		// Join test_results with test_cases
		{{Key: "$lookup", Value: bson.M{
			"from":         "test_cases",
			"localField":   "test_case_id",
			"foreignField": "_id",
			"as":           "test_case",
		}}},
		// Unwind test_case
		{{Key: "$unwind", Value: bson.M{
			"path":                       "$test_case",
			"preserveNullAndEmptyArrays": false,
		}}},
		// Join test_case with user_apis
		{{Key: "$lookup", Value: bson.M{
			"from":         "user_apis",
			"localField":   "test_case.api_id",
			"foreignField": "_id",
			"as":           "user_api",
		}}},
		// Unwind user_api
		{{Key: "$unwind", Value: bson.M{
			"path":                       "$user_api",
			"preserveNullAndEmptyArrays": false,
		}}},
		// Match user_api.user_id to the given user
		{{Key: "$match", Value: bson.M{
			"user_api.user_id": userObjectID,
		}}},
		// Group by user_api to collect all test_results per API
		{{Key: "$group", Value: bson.M{
			"_id":              "$user_api._id",
			"user_api":         bson.M{"$first": "$user_api"},
			"test_cases_count": bson.M{"$sum": 1},
			"test_results": bson.M{"$push": bson.M{
				"_id":              "$_id",
				"test_case_id":     "$test_case_id",
				"status_code":      "$status_code",
				"response":         "$response",
				"expected_outcome": "$expected_outcome",
				"test_result":      "$test_result",
				"duration":         "$duration",
				"executed_at":      "$executed_at",
				"run_count":        "$run_count",
				"test_case":        "$test_case",
			}},
		}}},
	}

	cursor, err := collection.Aggregate(ctx, pipeline)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer cursor.Close(ctx)

	var apisWithResults []bson.M
	if err = cursor.All(ctx, &apisWithResults); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"apis": apisWithResults})
}
