package routes

import (
	// "trafyx/backend/config"
	"trafyx/backend/handlers"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(router *gin.Engine) {
	api := router.Group("/v1")
	{
		api.GET("/ping", func(c *gin.Context) {
			c.JSON(200, gin.H{"ping": "pong"})
		})

		// Saving test cases
		api.POST("/test-case", handlers.AddTestCaseToDB)

		// Fetching all the test cases for an API id
		api.GET("/test-case", handlers.FetchTestCasesByAPIId)

		// Update test case
		api.PUT("/test-case", handlers.UpdateTestCase)

		// Delete test case
		api.DELETE("/test-case", handlers.DeleteTestCase)

		// Generating the Test cases using go lang
		api.POST("/test-case/generate", handlers.GenerateTestCases)

		// Save API information
		api.POST("/api", handlers.SaveAPIToDB)

		// Load test
		api.POST("/load-test", handlers.LoadTest)

		// Run the test cases
		api.POST("/test-case/run", handlers.ExecuteTestCases)

		// Update API information
		api.PUT("/api/:id", handlers.UpdateUserAPI)

		// Delete User API
		api.DELETE("/api/:id", handlers.DeleteUserAPIById)

		// Fetch API details and test cases using API ID
		api.GET("/api/:api_id", handlers.GetUserAPIById)

		// Get all the API for a user using user id
		api.GET("/user/apis/:user_id", handlers.GetAllUserAPIsByUserId)

		// Get all the APIs with test results available
		api.GET("/user/test-results/:user_id", handlers.GetAPIsWithTestResultsAvailable)

		// Get all the test results using API ID
		api.GET("/test-results/:id", handlers.GetTestResults)

		// Delete test results
		api.DELETE("/test-results/:id", handlers.DeleteTestResults)

		// User stats for the dashboard
		api.GET("/user/stats/:id", handlers.GetUserStats)

		// Delete user details
		api.DELETE("/user/delete/:id", handlers.DeleteUserFromDB)
	}
}
