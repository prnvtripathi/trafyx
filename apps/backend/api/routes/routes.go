package routes

import (
	"backend/api/handlers"
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(router *gin.Engine) {
	api := router.Group("/api")
	{
		api.POST("/test-cases", handlers.CreateTestCase)
		api.GET("/test-cases", handlers.ListTestCases)
	}
}
