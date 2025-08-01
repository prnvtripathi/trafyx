package handlers

import (
	"context"
	"log"
	"net/http"
	"time"

	"trafyx/backend/api/models"
	"trafyx/backend/config"
	"trafyx/backend/types"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/v2/bson"
)

func AddTestCaseToDB(c *gin.Context) {
	// check the JSON format
	var testCaseRequest types.AddTestCaseRequest
	if err := c.ShouldBindJSON(&testCaseRequest); err != nil {
		log.Printf("Invalid JSON format: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request format", "details": err.Error()})
		return
	}

	// Check for the length of the array of test cases
	if len(testCaseRequest.TestCases) == 0 {
		log.Println("No test cases provided in the request")
		c.JSON(http.StatusBadRequest, gin.H{"error": "No test cases provided"})
		return
	}

	// For each test case in the testCases array, add them to db
	for _, testCase := range testCaseRequest.TestCases {
		collection := config.MongoDB.Collection("test_cases")

		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()

		_, err := collection.InsertOne(ctx, testCase)
		if err != nil {
			log.Printf("Failed to insert test case: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{
				"error":   "Failed to insert test case",
				"details": err.Error(),
			})
			return
		}
	}

	log.Println("All test cases inserted successfully")
	c.JSON(http.StatusOK, gin.H{"message": "Test cases added successfully"})
}

func FetchTestCasesByAPIId(c *gin.Context) {
	api_id := c.Query("api_id")

	log.Printf("api_id: %s", api_id)
	if api_id == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "api_id is required"})
		return
	}

	// Convert api_id to an ObjectID
	objectID, err := bson.ObjectIDFromHex(api_id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid api_id"})
		return
	}
	log.Printf("api_id (ObjectID): %v", objectID)

	// Connect to the test_cases collection
	collection := config.MongoDB.Collection("test_cases")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Query for test cases with the specified user_api_id
	cursor, err := collection.Find(ctx, bson.M{"api_id": objectID})
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
