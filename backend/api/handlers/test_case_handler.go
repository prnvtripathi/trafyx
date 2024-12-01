package handlers

import (
	"backend/api/models"
	"backend/config"
	"context"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func AddTestCase(tc models.TestCase) error {
	collection := config.MongoDB.Collection("test_cases")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	_, err := collection.InsertOne(ctx, tc)
	if err != nil {
		log.Printf("Failed to insert test case: %v", err)
		return err
	}

	return nil
}

func GetTestCasesByAPIID(c *gin.Context) {
	// Get the user_api_id from query parameters
	userAPIID := c.Query("api_id")
	log.Printf("user_api_id: %s", userAPIID)
	if userAPIID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user_api_id is required"})
		return
	}

	// Convert user_api_id to an ObjectID
	objectID, err := primitive.ObjectIDFromHex(userAPIID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user_api_id"})
		return
	}
	log.Printf("user_api_id (ObjectID): %v", objectID)

	// Connect to the test_cases collection
	collection := config.MongoDB.Collection("test_cases")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Query for test cases with the specified user_api_id
	cursor, err := collection.Find(ctx, bson.M{"apiid": objectID})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch test cases: " + err.Error()})
		return
	}
	defer cursor.Close(ctx)

	log.Println("Fetching test cases...")
	log.Printf("Number of test cases: %d", cursor.RemainingBatchLength())

	// Decode the test cases
	var testCases []models.TestCase
	if err := cursor.All(ctx, &testCases); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode test cases: " + err.Error()})
		return
	}
	log.Printf("Number of test cases decoded: %d", len(testCases))

	// Return the test cases
	c.JSON(http.StatusOK, testCases)
}
