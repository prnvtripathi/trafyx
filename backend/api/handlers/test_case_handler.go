package handlers

import (
	"backend/api/models"
	"backend/config"
	"context"
	"encoding/json"
	"fmt"
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

type TestCasesRequest struct {
	TestCasesJSON string `json:"test_cases"`
	APIID         string `json:"api_id"`
}

type TestCasesPayload struct {
	TestCases []struct {
		Name            string `json:"Name"`
		Method          string `json:"Method"`
		URL             string `json:"URL"`
		Headers         string `json:"Headers"`
		Payload         string `json:"Payload"`
		Description     string `json:"Description"`
		ExpectedOutcome int    `json:"ExpectedOutcome"`
	} `json:"testCases"`
}

func AddGenAITestCases(c *gin.Context) {
	// Parse the initial request
	var req TestCasesRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		fmt.Printf("JSON binding error: %v\n", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body: " + err.Error()})
		return
	}

	fmt.Printf("Received request with API ID: %s\n", req.APIID)

	// Parse the nested JSON string containing the test cases
	var testCasesPayload TestCasesPayload
	if err := json.Unmarshal([]byte(req.TestCasesJSON), &testCasesPayload); err != nil {
		fmt.Printf("Test cases JSON parsing error: %v\n", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid test cases format: " + err.Error()})
		return
	}

	fmt.Printf("Successfully parsed %d test cases\n", len(testCasesPayload.TestCases))

	// Validate API ID
	apiID, err := primitive.ObjectIDFromHex(req.APIID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid API ID format"})
		return
	}

	collection := config.MongoDB.Collection("test_cases")

	var testCasesToInsert []interface{}
	for i, testCase := range testCasesPayload.TestCases {
		fmt.Printf("Processing test case #%d: %s\n", i+1, testCase.Name)

		// Create a new test case with proper field values
		newCase := models.TestCase{
			ID:              primitive.NewObjectID(),
			CreatedAt:       primitive.NewDateTimeFromTime(time.Now()),
			APIID:           apiID,
			Name:            testCase.Name,
			Method:          testCase.Method,
			URL:             testCase.URL,
			Headers:         testCase.Headers,
			Payload:         testCase.Payload,
			Description:     testCase.Description,
			ExpectedOutcome: testCase.ExpectedOutcome,
		}
		testCasesToInsert = append(testCasesToInsert, newCase)
	}

	if len(testCasesToInsert) > 0 {
		result, err := collection.InsertMany(context.TODO(), testCasesToInsert)
		if err != nil {
			fmt.Printf("MongoDB error: %v\n", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to insert test cases"})
			return
		}
		fmt.Printf("Successfully inserted %d test cases\n", len(result.InsertedIDs))
		c.JSON(http.StatusCreated, gin.H{"message": "Test cases added successfully"})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No valid test cases provided"})
	}
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
