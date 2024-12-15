package handlers

import (
	"bytes"
	"context"
	"encoding/json"
	"log"
	"net/http"
	"sync"
	"time"

	"backend/api/models"
	"backend/config"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Execute Test Cases
func ExecuteTestCases(c *gin.Context) {
	apiId := c.Query("api_id")

	// Fetch test cases from mongoDb
	log.Println("Fetching test cases for api_id: " + apiId)
	testCases, err := fetchTestCases(apiId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	}

	// Run the test cases through
	log.Println("Running test Cases for the apiId: " + apiId)
	results, err := runTestCases(testCases)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	}

	// Save the test results in the DB
	log.Println("Saving test results for apiId: " + apiId)
	saved, err := saveResultsInDB(results)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	}

	c.JSON(http.StatusOK, gin.H{"results": results, "success": saved})
}

func fetchTestCases(apiId string) ([]models.TestCase, error) {
	objectId, err := primitive.ObjectIDFromHex(apiId)
	if err != nil {
		return []models.TestCase{}, err
	}

	collection := config.MongoDB.Collection("test_cases")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Finding all the test cases for the given user API
	cursor, err := collection.Find(ctx, bson.M{"apiid": objectId})
	if err != nil {
		log.Fatal(err)
		return []models.TestCase{}, err
	}
	defer cursor.Close(ctx)

	// Prepare the results response
	var testCases []models.TestCase
	if err = cursor.All(ctx, &testCases); err != nil {
		log.Fatal(err)
		return []models.TestCase{}, err
	}

	return testCases, nil
}

// Function to run the test cases
func runTestCases(testCases []models.TestCase) ([]models.TestResult, error) {
	var results []models.TestResult
	var wg sync.WaitGroup
	var mu = &sync.Mutex{}

	for _, testCase := range testCases {
		wg.Add(1)
		go func(tc models.TestCase) {
			defer wg.Done()

			start := time.Now()
			headers := make(map[string]string)
			if err := json.Unmarshal([]byte(tc.Headers), &headers); err != nil {
				log.Println("Error in unmarshalling headers")
				return
			}

			req, err := http.NewRequest(tc.Method, tc.URL, bytes.NewBuffer([]byte(tc.Payload)))
			if err != nil {
				log.Println("Error in creating new request")
				return
			}

			for key, value := range headers {
				req.Header.Set(key, value)
			}

			client := &http.Client{}
			resp, err := client.Do(req)
			if err != nil {
				mu.Lock()
				results = append(results, models.TestResult{
					TestCaseID:      tc.ID,
					StatusCode:      0,
					Response:        err.Error(),
					ExpectedOutcome: tc.ExpectedOutcome,
					TestResult:      false,
					Duration:        time.Since(start).Seconds(),
					ExecutedAt:      primitive.NewDateTimeFromTime(start),
				})
				mu.Unlock()
				return
			}
			defer resp.Body.Close()

			isTestPassed := resp.StatusCode == tc.ExpectedOutcome

			mu.Lock()
			results = append(results, models.TestResult{
				TestCaseID:      tc.ID,
				StatusCode:      resp.StatusCode,
				Response:        string(tc.Payload),
				ExpectedOutcome: tc.ExpectedOutcome,
				TestResult:      isTestPassed,
				Duration:        time.Since(start).Seconds(),
				ExecutedAt:      primitive.NewDateTimeFromTime(start),
			})
			mu.Unlock()
		}(testCase)
	}
	wg.Wait()
	return results, nil
}

// function to save the results directly in the DB
func saveResultsInDB(results []models.TestResult) (bool, error) {
	collection := config.MongoDB.Collection("test_results")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var insertDocs []interface{}
	for _, result := range results {
		insertDocs = append(insertDocs, result)
	}

	_, err := collection.InsertMany(ctx, insertDocs)
	if err != nil {
		return false, err
	}

	return true, nil
}
