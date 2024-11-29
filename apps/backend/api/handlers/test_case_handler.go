package handlers

import (
	"backend/api/models"
	"backend/config"
	"github.com/gin-gonic/gin"
	"net/http"
)

// CreateTestCase handles creating a new test case
func CreateTestCase(c *gin.Context) {
	var testCase models.TestCase
	if err := c.ShouldBindJSON(&testCase); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Create(&testCase)
	c.JSON(http.StatusCreated, testCase)
}

// ListTestCases fetches all test cases
func ListTestCases(c *gin.Context) {
	var testCases []models.TestCase
	config.DB.Find(&testCases)
	c.JSON(http.StatusOK, testCases)
}
