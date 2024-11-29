package handlers

import (
	"backend/api/models"
	"backend/config"
	"context"
	"fmt"
	"strings"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// fetch API details from the database
func fetchUserAPIs(APIID string) (models.UserAPI, error) {
	collection := config.MongoDB.Collection("user_apis")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	cursor, err := collection.Find(ctx, primitive.M{"_id": APIID})
	if err != nil {
		return models.UserAPI{}, err
	}
	defer cursor.Close(ctx)

	var userAPI models.UserAPI
	if err = cursor.Decode(&userAPI); err != nil {
		return models.UserAPI{}, err
	}

	return userAPI, nil
}

// GenerateTestCases will generate test cases based on the user's API details.
func generateTestCases(userAPI models.UserAPI) ([]models.TestCase, error) {
	var testCases []models.TestCase

	// Happy Path Case
	happyPathTestCase := models.TestCase{
		ID:              primitive.NewObjectID(),
		APIID:           userAPI.ID.Hex(),
		Name:            "Happy Path - " + userAPI.Name,
		Description:     "Test to verify the API returns the expected result with valid data.",
		ExpectedOutcome: fmt.Sprintf("200 OK or valid response for %s", userAPI.URL),
		Payload:         userAPI.Payload,
		Headers:         userAPI.Headers,
		Method:          userAPI.Method,
		URL:             userAPI.URL,
	}
	testCases = append(testCases, happyPathTestCase)

	// Negative Test Cases
	// 1. Invalid Method
	invalidMethodTestCase := models.TestCase{
		ID:              primitive.NewObjectID(),
		APIID:           userAPI.ID.Hex(),
		Name:            "Negative Test - Invalid Method",
		Description:     "Test to verify the API responds with error for invalid HTTP method.",
		ExpectedOutcome: "405 Method Not Allowed",
		Payload:         userAPI.Payload,
		Headers:         userAPI.Headers,
		Method:          "INVALID", // Use a method that's not valid
		URL:             userAPI.URL,
	}
	testCases = append(testCases, invalidMethodTestCase)

	// 2. Invalid Payload (for POST/PUT)
	invalidPayloadTestCase := models.TestCase{
		ID:              primitive.NewObjectID(),
		APIID:           userAPI.ID.Hex(),
		Name:            "Negative Test - Invalid Payload",
		Description:     "Test to verify the API responds with error for invalid payload.",
		ExpectedOutcome: "400 Bad Request",
		Payload:         `{"invalid_field": "value"}`, // Invalid data
		Headers:         userAPI.Headers,
		Method:          userAPI.Method,
		URL:             userAPI.URL,
	}
	testCases = append(testCases, invalidPayloadTestCase)

	// Edge Cases (Boundary Test Cases)
	// 1. Empty Payload
	emptyPayloadTestCase := models.TestCase{
		ID:              primitive.NewObjectID(),
		APIID:           userAPI.ID.Hex(),
		Name:            "Edge Case - Empty Payload",
		Description:     "Test to verify the API handles empty payload correctly.",
		ExpectedOutcome: "400 Bad Request",
		Payload:         "",
		Headers:         userAPI.Headers,
		Method:          userAPI.Method,
		URL:             userAPI.URL,
	}
	testCases = append(testCases, emptyPayloadTestCase)

	// 2. Empty Query Parameter (if applicable)
	emptyQueryParamTestCase := models.TestCase{
		ID:              primitive.NewObjectID(),
		APIID:           userAPI.ID.Hex(),
		Name:            "Edge Case - Empty Query Param",
		Description:     "Test to verify the API handles empty query parameters correctly.",
		ExpectedOutcome: "400 Bad Request",
		Payload:         "",
		Headers:         userAPI.Headers,
		Method:          userAPI.Method,
		URL:             userAPI.URL + "?param=", // Empty query param
	}
	testCases = append(testCases, emptyQueryParamTestCase)

	// Performance Test Case
	// 1. Stress Test with a large payload (for POST/PUT)
	largePayloadTestCase := models.TestCase{
		ID:              primitive.NewObjectID(),
		APIID:           userAPI.ID.Hex(),
		Name:            "Performance Test - Large Payload",
		Description:     "Test to verify the API can handle a large payload.",
		ExpectedOutcome: "200 OK or server-side error handling",
		Payload:         strings.Repeat("A", 10000), // Large payload
		Headers:         userAPI.Headers,
		Method:          userAPI.Method,
		URL:             userAPI.URL,
	}
	testCases = append(testCases, largePayloadTestCase)

	// More test cases can be added here based on specific API logic

	// Store the generated test cases in the database
	collection := config.MongoDB.Collection("test_cases")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Insert all generated test cases
	for _, tc := range testCases {
		_, err := collection.InsertOne(ctx, tc)
		if err != nil {
			return nil, err
		}
	}

	return testCases, nil
}

// save the test cases to the database
func saveTestCases(testCases []models.TestCase) error {
	collection := config.MongoDB.Collection("test_cases")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	for _, tc := range testCases {
		_, err := collection.InsertOne(ctx, tc)
		if err != nil {
			return err
		}
	}

	return nil
}

// Handler function to generate test cases for a user API
func GenerateTestCases(userAPIID string) ([]models.TestCase, error) {
	fmt.Println("Generating test cases for user API:", userAPIID)
	// fetch user APIs from the database
	userAPI, err := fetchUserAPIs(userAPIID)
	fmt.Println(userAPI)
	if err != nil {
		return nil, err
	}

	// generate test cases based on the user API
	testCases, err := generateTestCases(userAPI)
	if err != nil {
		return nil, err
	}

	// save the generated test cases to the database
	err = saveTestCases(testCases)
	if err != nil {
		return nil, err
	}

	return testCases, nil
}
