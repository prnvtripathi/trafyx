package routes

import (
	"backend/api/handlers"
	"backend/api/models"
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(router *gin.Engine) {
	api := router.Group("/api")
	{
		// Endpoint for creating a new test case
		api.POST("/test-cases", func(c *gin.Context) {
			var testCase models.TestCase
			if err := c.ShouldBindJSON(&testCase); err != nil {
				c.JSON(400, gin.H{"error": err.Error()})
				return
			}
			if err := handlers.AddTestCase(testCase); err != nil {
				c.JSON(500, gin.H{"error": err.Error()})
				return
			}
			c.JSON(201, gin.H{"message": "Test case added successfully"})
		})

		api.POST("/save/cases/gen-ai", handlers.AddGenAITestCases)

		// Endpoint for listing all test cases
		api.GET("/test-cases", handlers.GetTestCasesByAPIID)

		// Endpoint for running all test cases using golang
		api.GET("/test-cases/golang/run", handlers.ExecuteTestCases)

		// Endpoint for running test cases using Kestra
		api.GET("/test-cases/kestra/run", handlers.ExecuteAPITest)

		// Endpoint for adding user API information
		api.POST("/user-apis", handlers.AddUserAPI)

		// Endpoint for updating user API information
		api.PUT("/user-apis/:id", handlers.UpdateUserAPI)

		// Endpoint for fetching user API information by ID
		api.GET("/user-apis/:id", handlers.GetUserAPIById)

		// Endpoint for fetching all the user API information
		api.GET("/user-apis", handlers.GetAllUserAPIsByUserId)

		// Endpoint for generating test cases using Gemini
		api.POST("/generate-test-cases", func(c *gin.Context) {
			// take api_id from request body
			var apiID struct {
				APIID string `json:"api_id"`
			}
			if err := c.ShouldBindJSON(&apiID); err != nil {
				c.JSON(400, gin.H{"error": err.Error()})
				return
			}
			// call handlers.GenerateTestCases with apiID
			test_cases, err := handlers.GenerateTestCases(apiID.APIID)
			if err != nil {
				c.JSON(500, gin.H{"error": err.Error()})
				return
			}
			c.JSON(200, test_cases)
		})

		// Delete user API by Id
		api.DELETE("/user-apis/:id", handlers.DeleteUserAPIById)

		// New endpoints for test results
		api.POST("/test-results", handlers.AddTestResults)
		api.GET("/test-results", handlers.GetTestResults)
		api.DELETE("/test-results", handlers.DeleteTestResults)
	}
}
