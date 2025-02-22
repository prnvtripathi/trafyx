package handlers

import (
	"backend/api/models"
	"backend/config"
	"context"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"net/http"
	"time"
)

// Define structs for our API response.
type APIStats struct {
	APIID           primitive.ObjectID `json:"api_id"`
	Name            string             `json:"name"`
	TestCasesCount  int                `json:"test_cases_count"`
	TestRunsCount   int                `json:"test_runs_count"`
	PassedTestRuns  int                `json:"passed_test_runs"`
	FailedTestRuns  int                `json:"failed_test_runs"`
	SuccessRate     float64            `json:"success_rate"`     // in percentage
	AverageDuration float64            `json:"average_duration"` // in seconds
	TotalDuration   float64            `json:"-"`                // temporary field for calculation
}

type StatsResponse struct {
	UserID          primitive.ObjectID `json:"user_id"`
	TotalAPIs       int                `json:"total_apis"`
	TotalTestCases  int                `json:"total_test_cases"`
	TotalTestRuns   int                `json:"total_test_runs"`
	PassedTestRuns  int                `json:"passed_test_runs"`
	FailedTestRuns  int                `json:"failed_test_runs"`
	SuccessRate     float64            `json:"success_rate"`     // overall pass rate in percentage
	AverageDuration float64            `json:"average_duration"` // overall average duration in seconds
	APIStats        []APIStats         `json:"api_stats"`
}

// GetUserStats aggregates statistics for a given user.
func GetUserStats(c *gin.Context) {
	// 1. Retrieve and validate the user_id from query parameters.
	userID := c.Query("user_id")
	if userID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User ID is required"})
		return
	}
	userObjID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid User ID"})
		return
	}

	// 2. Create a context for the database operations.
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// 3. Fetch all APIs for this user.
	userAPIColl := config.MongoDB.Collection("user_apis")
	cursor, err := userAPIColl.Find(ctx, bson.M{"user_id": userObjID})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch user APIs"})
		return
	}
	defer cursor.Close(ctx)

	var userAPIs []models.UserAPI
	if err = cursor.All(ctx, &userAPIs); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode user APIs"})
		return
	}
	totalAPIs := len(userAPIs)
	if totalAPIs == 0 {
		// No APIs defined for the user; return empty stats.
		c.JSON(http.StatusOK, StatsResponse{
			UserID:          userObjID,
			TotalAPIs:       0,
			TotalTestCases:  0,
			TotalTestRuns:   0,
			PassedTestRuns:  0,
			FailedTestRuns:  0,
			SuccessRate:     0,
			AverageDuration: 0,
			APIStats:        []APIStats{},
		})
		return
	}

	// 4. Prepare for aggregating API-level stats.
	var apiIDs []primitive.ObjectID
	apiStatsMap := make(map[primitive.ObjectID]*APIStats)
	for _, api := range userAPIs {
		apiIDs = append(apiIDs, api.ID)
		apiStatsMap[api.ID] = &APIStats{
			APIID: api.ID,
			Name:  api.Name,
		}
	}

	// 5. Get all test cases associated with the user's APIs.
	testCasesColl := config.MongoDB.Collection("test_cases")
	cursor, err = testCasesColl.Find(ctx, bson.M{"api_id": bson.M{"$in": apiIDs}})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch test cases"})
		return
	}
	defer cursor.Close(ctx)

	var testCases []models.TestCase
	if err = cursor.All(ctx, &testCases); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode test cases"})
		return
	}
	totalTestCases := len(testCases)

	// Map each test case ID to its corresponding API ID.
	testCaseToAPI := make(map[primitive.ObjectID]primitive.ObjectID)
	var testCaseIDs []primitive.ObjectID
	for _, tc := range testCases {
		testCaseIDs = append(testCaseIDs, tc.ID)
		testCaseToAPI[tc.ID] = tc.APIID
		// Increase count of test cases per API.
		if apiStat, ok := apiStatsMap[tc.APIID]; ok {
			apiStat.TestCasesCount++
		}
	}

	// 6. Retrieve test results for all test cases (if any exist).
	totalTestRuns := 0
	passedTestRuns := 0
	sumDuration := 0.0
	if len(testCaseIDs) > 0 {
		testResultsColl := config.MongoDB.Collection("test_results")
		cursor, err = testResultsColl.Find(ctx, bson.M{"test_case_id": bson.M{"$in": testCaseIDs}})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch test results"})
			return
		}
		defer cursor.Close(ctx)

		var testResults []models.TestResult
		if err = cursor.All(ctx, &testResults); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode test results"})
			return
		}
		totalTestRuns = len(testResults)

		// Aggregate overall and per-API test results.
		for _, tr := range testResults {
			if tr.TestResult {
				passedTestRuns++
			}
			sumDuration += tr.Duration

			// Map the test result back to the API via its test case.
			if apiID, exists := testCaseToAPI[tr.TestCaseID]; exists {
				if apiStat, ok := apiStatsMap[apiID]; ok {
					apiStat.TestRunsCount++
					if tr.TestResult {
						apiStat.PassedTestRuns++
					} else {
						apiStat.FailedTestRuns++
					}
					apiStat.TotalDuration += tr.Duration
				}
			}
		}
	}

	// 7. Compute overall success rate and average duration.
	overallSuccessRate := 0.0
	overallAverageDuration := 0.0
	if totalTestRuns > 0 {
		overallSuccessRate = (float64(passedTestRuns) / float64(totalTestRuns)) * 100
		overallAverageDuration = sumDuration / float64(totalTestRuns)
	}

	// 8. Compute API-level success rate and average duration.
	var apiStats []APIStats
	for _, stat := range apiStatsMap {
		if stat.TestRunsCount > 0 {
			stat.SuccessRate = (float64(stat.PassedTestRuns) / float64(stat.TestRunsCount)) * 100
			stat.AverageDuration = stat.TotalDuration / float64(stat.TestRunsCount)
		}
		apiStats = append(apiStats, *stat)
	}

	// 9. Build and return the stats response.
	statsResponse := StatsResponse{
		UserID:          userObjID,
		TotalAPIs:       totalAPIs,
		TotalTestCases:  totalTestCases,
		TotalTestRuns:   totalTestRuns,
		PassedTestRuns:  passedTestRuns,
		FailedTestRuns:  totalTestRuns - passedTestRuns,
		SuccessRate:     overallSuccessRate,
		AverageDuration: overallAverageDuration,
		APIStats:        apiStats,
	}

	c.JSON(http.StatusOK, statsResponse)
}
