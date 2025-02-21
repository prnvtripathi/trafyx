package handlers

import (
	"backend/api/models"
	"backend/config"
	"context"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// AddUserAPI handles adding user API information to MongoDB
func AddUserAPI(c *gin.Context) {
	var userAPI models.UserAPI

	log.Println("Adding user API information")
	log.Println(c.Request.Body)

	// Bind JSON input to the UserAPI struct
	if err := c.ShouldBindJSON(&userAPI); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Convert user_id from string to primitive.ObjectID (if it's a valid string)
	if userAPI.UserID != primitive.NilObjectID {
		if userAPI.UserID == primitive.NilObjectID {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid UserID format", "success": false})
			return
		}
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": "UserID is required", "success": false})
		return
	}

	// check if user exists
	userCollection := config.MongoDB.Collection("users")
	userFilter := bson.M{"_id": userAPI.UserID}
	userCount, err := userCollection.CountDocuments(context.Background(), userFilter)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to check user existence", "success": false})
		return
	}
	if userCount == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found", "success": false})
		return
	}

	log.Println(userAPI.UserID)

	// Set additional fields (CreatedAt, UpdatedAt, ID)
	userAPI.ID = primitive.NewObjectID()
	userAPI.CreatedAt = primitive.NewDateTimeFromTime(time.Now())
	userAPI.UpdatedAt = primitive.NewDateTimeFromTime(time.Now())

	// Insert into MongoDB
	collection := config.MongoDB.Collection("user_apis")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	_, err = collection.InsertOne(ctx, userAPI)
	if err != nil {
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
	objectID, err := primitive.ObjectIDFromHex(apiID)
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
	userID := c.Query("user_id")

	// Parse the ID as an ObjectID
	objectID, err := primitive.ObjectIDFromHex(userID)
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

	c.JSON(http.StatusOK, userAPIs)
}

func GetUserAPIById(c *gin.Context) {
	// Extract API ID from the URL parameters
	apiID := c.Param("id")

	log.Println(apiID)

	// Parse the ID as an ObjectID
	objectID, err := primitive.ObjectIDFromHex(apiID)
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
	cursor, err := testCaseCollection.Find(ctx, bson.M{"apiid": objectID})
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
	})
}
