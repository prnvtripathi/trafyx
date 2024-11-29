package routes

import (
	"backend/api/handlers"
	"backend/api/models"
	"backend/services"
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

		// Endpoint for listing all test cases
		api.GET("/test-cases", func(c *gin.Context) {
			testCases, err := handlers.GetAllTestCases()
			if err != nil {
				c.JSON(500, gin.H{"error": err.Error()})
				return
			}
			c.JSON(200, testCases)
		})

		// Endpoint for running all test cases
		api.POST("/test-cases/run", func(c *gin.Context) {
			results, err := services.ExecuteTests()
			if err != nil {
				c.JSON(500, gin.H{"error": err.Error()})
				return
			}
			c.JSON(200, results)
		})

		// Endpoint for adding user API information
		api.POST("/user-apis", handlers.AddUserAPI)

		// Endpoint for updating user API information
		api.PUT("/user-apis/:id", handlers.UpdateUserAPI)

		// Endpoint for generating test cases using Gemini
		api.POST("/generate-test-cases", func(c *gin.Context) {
			var userAPI string
			if err := c.ShouldBindJSON(&userAPI); err != nil {
				c.JSON(400, gin.H{"error": err.Error()})
				return
			}
			testCases, err := handlers.GenerateTestCases(userAPI)
			if err != nil {
				c.JSON(500, gin.H{"error": err.Error()})
				return
			}
			c.JSON(200, testCases)
		})


		// Add more routes as needed for test execution and results
		// api.POST("/test-cases/run", handlers.RunTestCases)
		// api.GET("/test-cases/results", handlers.GetTestResults)
	}
}
