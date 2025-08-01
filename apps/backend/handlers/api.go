package handlers

import (
	"context"
	"log"
	"net/http"
	"time"

	"trafyx/backend/api/models"
	"trafyx/backend/config"
	"trafyx/backend/types"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/v2/bson"
)

/*
type APISaveRequest struct {
	UserID      string `json:"user_id"`     // To identify the user
	Name        string `json:"name"`        // API name
	Method      string `json:"method"`      // HTTP Method (GET, POST, etc.)
	URL         string `json:"url"`         // Endpoint URL
	Headers     string `json:"headers"`     // JSON string for headers
	Payload     string `json:"payload"`     // Request payload for POST/PUT
	Description string `json:"description"` // Description of the API
}
*/

func SaveAPIToDB(c *gin.Context) {
	// Parse and validate the incoming JSON request
	var apiRequest types.APISaveRequest
	if err := c.ShouldBindJSON(&apiRequest); err != nil {
		log.Printf("Invalid JSON format: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request format", "details": err.Error()})
		return
	}

	log.Println("Adding user API information")

	// Create a UserAPI model from the request
	userAPI := models.UserAPI{
		UserID:      apiRequest.UserID,
		Name:        apiRequest.Name,
		Method:      apiRequest.Method,
		URL:         apiRequest.URL,
		Headers:     apiRequest.Headers,
		Payload:     apiRequest.Payload,
		Description: apiRequest.Description,
	}

	// Validate UserID
	if userAPI.UserID == bson.NilObjectID {
		c.JSON(http.StatusBadRequest, gin.H{"error": "UserID is required", "success": false})
		return
	}

	// Check if the user exists in the database
	userCollection := config.MongoDB.Collection("users")
	userFilter := bson.M{"_id": userAPI.UserID}
	userCount, err := userCollection.CountDocuments(context.Background(), userFilter)
	if err != nil {
		log.Printf("Error checking user existence: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to check user existence", "success": false})
		return
	}
	if userCount == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found", "success": false})
		return
	}

	log.Printf("User exists with ID: %v", userAPI.UserID)

	// Set additional fields for the UserAPI document
	userAPI.ID = bson.NewObjectID()
	userAPI.CreatedAt = bson.NewDateTimeFromTime(time.Now())
	userAPI.UpdatedAt = bson.NewDateTimeFromTime(time.Now())

	// Insert the UserAPI document into the database
	collection := config.MongoDB.Collection("user_apis")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	_, err = collection.InsertOne(ctx, userAPI)
	if err != nil {
		log.Printf("Error inserting UserAPI document: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save API information", "success": false})
		return
	}

	// Respond with success message and the inserted API data
	c.JSON(http.StatusCreated, gin.H{"message": "API information saved successfully", "api": userAPI, "success": true})
}

// UpdateUserAPI handles editing user API information in MongoDB
func UpdateUserAPI(c *gin.Context) {
	// Extract API ID from the URL parameters
	apiID := c.Param("id")

	// Parse the ID as an ObjectID
	objectID, err := bson.ObjectIDFromHex(apiID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid API ID"})
		return
	}

	var updatedAPI models.UserAPI
	if err := c.ShouldBindJSON(&updatedAPI); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Set the updated timestamp
	updatedAPI.ID = objectID

	collection := config.MongoDB.Collection("user_apis")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Perform the update
	filter := bson.M{"_id": objectID}
	update := bson.M{
		"$set": bson.M{
			"name":        updatedAPI.Name,
			"method":      updatedAPI.Method,
			"url":         updatedAPI.URL,
			"headers":     updatedAPI.Headers,
			"payload":     updatedAPI.Payload,
			"description": updatedAPI.Description,
		},
	}

	result, err := collection.UpdateOne(ctx, filter, update)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update API information"})
		return
	}

	if result.ModifiedCount == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "API not found or no changes made"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "API information updated successfully"})
}

func GetAllUserAPIsByUserId(c *gin.Context) {
	// Extract user ID from the URL parameters
	userID := c.Param("user_id")

	// Parse the ID as an ObjectID
	objectID, err := bson.ObjectIDFromHex(userID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid User ID"})
		return
	}

	collection := config.MongoDB.Collection("user_apis")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Perform the find operation
	cursor, err := collection.Find(ctx, bson.M{"user_id": objectID})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch API information"})
		return
	}
	defer cursor.Close(ctx)

	// Prepare the response
	var userAPIs []models.UserAPI
	if err = cursor.All(ctx, &userAPIs); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch API information"})
		return
	}
	response := gin.H{
		"user_id": objectID.Hex(),
		"apis":    userAPIs,
		"success": true,
		"message": "User APIs fetched successfully",
	}

	c.JSON(http.StatusOK, response)
}

func GetUserAPIById(c *gin.Context) {
	// Extract API ID from the URL parameters
	apiID := c.Param("api_id")

	log.Println(apiID)

	// Parse the ID as an ObjectID
	objectID, err := bson.ObjectIDFromHex(apiID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid API ID"})
		return
	}

	collection := config.MongoDB.Collection("user_apis")
	testCaseCollection := config.MongoDB.Collection("test_cases")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Perform the find operation for user API
	var userAPI models.UserAPI
	err = collection.FindOne(ctx, bson.M{"_id": objectID}).Decode(&userAPI)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "API not found"})
		return
	}

	// Perform the find operation for test cases related to the API
	var testCases []models.TestCase
	cursor, err := testCaseCollection.Find(ctx, bson.M{"api_id": objectID})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching test cases"})
		return
	}
	defer cursor.Close(ctx)

	if err := cursor.All(ctx, &testCases); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error decoding test cases"})
		return
	}

	// Return the API data along with its test cases
	c.JSON(http.StatusOK, gin.H{
		"user_api":   userAPI,
		"test_cases": testCases,
		"success":    true,
		"message":    "User API and test cases fetched successfully",
	})
}

func DeleteUserAPIById(c *gin.Context) {
	apiID := c.Param("id")
	objectID, err := bson.ObjectIDFromHex(apiID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid API ID"})
		return
	}

	collection := config.MongoDB.Collection("user_apis")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	filter := bson.M{"_id": objectID}
	_, err = collection.DeleteOne(ctx, filter)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete API information"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "API deleted successfully", "status": true})
}
