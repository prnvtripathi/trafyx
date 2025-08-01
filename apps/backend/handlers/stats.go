package handlers

import (
	"context"
	"net/http"
	"time"

	"trafyx/backend/api/models"
	"trafyx/backend/config"
	"trafyx/backend/types"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/v2/bson"
)

// GetUserStats aggregates statistics for a given user.
func GetUserStats(c *gin.Context) {
	// 1. Retrieve and validate the user_id from query parameters.
	userID := c.Param("id")
	if userID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User ID is required"})
		return
	}
	userObjID, err := bson.ObjectIDFromHex(userID)
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
		c.JSON(http.StatusOK, types.StatsResponse{
			UserID:          userID,
			TotalAPIs:       0,
			TotalTestCases:  0,
			TotalTestRuns:   0,
			PassedTestRuns:  0,
			FailedTestRuns:  0,
			SuccessRate:     0,
			AverageDuration: 0,
			APIStats:        []types.APIStats{},
		})
		return
	}

	// 4. Prepare for aggregating API-level stats.
	var apiIDs []bson.ObjectID
	apiStatsMap := make(map[bson.ObjectID]*types.APIStats)
	for _, api := range userAPIs {
		apiIDs = append(apiIDs, api.ID)
		apiStatsMap[api.ID] = &types.APIStats{
			APIID: api.ID.Hex(),
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
	testCaseToAPI := make(map[bson.ObjectID]bson.ObjectID)
	var testCaseIDs []bson.ObjectID
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
	var apiStats []types.APIStats
	for _, stat := range apiStatsMap {
		if stat.TestRunsCount > 0 {
			stat.SuccessRate = (float64(stat.PassedTestRuns) / float64(stat.TestRunsCount)) * 100
			stat.AverageDuration = stat.TotalDuration / float64(stat.TestRunsCount)
		}
		apiStats = append(apiStats, *stat)
	}

	// 9. Build and return the stats response.
	statsResponse := types.StatsResponse{
		UserID:          userID,
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
