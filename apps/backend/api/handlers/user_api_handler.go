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
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid UserID format"})
			return
		}
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": "UserID is required"})
		return
	}

	// check if user exists
	userCollection := config.MongoDB.Collection("users")
	userFilter := bson.M{"_id": userAPI.UserID}
	userCount, err := userCollection.CountDocuments(context.Background(), userFilter)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to check user existence"})
		return
	}
	if userCount == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
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
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save API information"})
		return
	}

	// Respond with success message and the inserted API data
	c.JSON(http.StatusCreated, gin.H{"message": "API information saved successfully", "api": userAPI})
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
