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

		// Set the created_at and updated_at timestamps if not already set
		if testCase.CreatedAt == 0 {
			testCase.CreatedAt = bson.DateTime(time.Now().Unix() * 1000)
		}
		testCase.UpdatedAt = testCase.CreatedAt // Set updated_at to created_at initially

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

func UpdateTestCase(c *gin.Context) {
	var testCaseRequest types.UpdateTestCaseRequest
	if err := c.ShouldBindJSON(&testCaseRequest); err != nil {
		log.Printf("Invalid JSON format: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request format", "details": err.Error()})
		return
	}

	// Validate the request
	if testCaseRequest.TestCaseId == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Test case ID is required"})
		return
	}

	// Update the test case in the database
	collection := config.MongoDB.Collection("test_cases")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Convert the test case ID to ObjectID
	objectID, err := bson.ObjectIDFromHex(testCaseRequest.TestCaseId)
	if err != nil {
		log.Printf("Invalid test case ID: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid test case ID"})
		return
	}

	// Perform the update operation
	filter := bson.M{"_id": objectID}
	update := bson.M{
		"$set": bson.M{
			"name":             testCaseRequest.TestCase.Name,
			"method":           testCaseRequest.TestCase.Method,
			"url":              testCaseRequest.TestCase.URL,
			"headers":          testCaseRequest.TestCase.Headers,
			"payload":          testCaseRequest.TestCase.Payload,
			"description":      testCaseRequest.TestCase.Description,
			"expected_outcome": testCaseRequest.TestCase.ExpectedOutcome,
			"updated_at":       bson.DateTime(time.Now().Unix() * 1000), // Update the timestamp
		},
	}

	result, err := collection.UpdateOne(ctx, filter, update)
	if err != nil {
		log.Printf("Failed to update test case: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update test case", "details": err.Error()})
		return
	}

	if result.ModifiedCount == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Test case not found or no changes made"})
		return
	}

	log.Println("Test case updated successfully")
	c.JSON(http.StatusOK, gin.H{"message": "Test case updated successfully"})
}

func DeleteTestCase(c *gin.Context) {
	var deleteRequest types.DeleteTestCaseRequest
	if err := c.ShouldBindJSON(&deleteRequest); err != nil {
		log.Printf("Invalid JSON format: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request format", "details": err.Error()})
		return
	}

	// Validate the request
	if deleteRequest.TestCaseId == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Test case ID is required"})
		return
	}

	// Delete the test case from the database
	collection := config.MongoDB.Collection("test_cases")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Convert the test case ID to ObjectID
	objectID, err := bson.ObjectIDFromHex(deleteRequest.TestCaseId)
	if err != nil {
		log.Printf("Invalid test case ID: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid test case ID"})
		return
	}

	_, err = collection.DeleteOne(ctx, bson.M{"_id": objectID})
	if err != nil {
		log.Printf("Failed to delete test case: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete test case", "details": err.Error()})
		return
	}

	log.Println("Test case deleted successfully")
	c.JSON(http.StatusOK, gin.H{"message": "Test case deleted successfully"})
}
