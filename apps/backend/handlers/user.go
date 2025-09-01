package handlers

import (
	"context"
	"net/http"
	"time"

	"trafyx/backend/config"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/v2/bson"
)

func DeleteUserFromDB(c *gin.Context) {
	// 1. Check if the user id is correct or not
	user_id := c.Param(":id")
	if user_id == "" {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "error": "User ID is required"})
		return
	}
	userObjID, err := bson.ObjectIDFromHex(user_id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "error": "Invalid User ID"})
		return
	}

	// 2. Create a context for the database operations.
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	users := config.MongoDB.Collection("user")
	cursor := users.FindOne(ctx, bson.M{"_id": userObjID})
	if err := cursor.Err(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": "Failed to find the user"})
		return
	}

	// 3. Delete user profile and credentials
	_, err = users.DeleteOne(ctx, bson.M{"_id": userObjID})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": "Failed to delete user profile"})
		return
	}

	// 4. Anonymize related data in other collections
	apiCollection := config.MongoDB.Collection("user_apis")
	_, err = apiCollection.UpdateMany(ctx, bson.M{"user_id": userObjID}, bson.M{
		"$set": bson.M{"user_id": nil},
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": "Failed to anonymize user APIs"})
		return
	}

	testCaseCollection := config.MongoDB.Collection("test_cases")
	apiCursor, err := apiCollection.Find(ctx, bson.M{"user_id": userObjID})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": "Failed to fetch user APIs for anonymizing test cases"})
		return
	}
	var apiIDs []bson.ObjectID
	for apiCursor.Next(ctx) {
		var api bson.M
		if err := apiCursor.Decode(&api); err == nil {
			if id, ok := api["_id"].(bson.ObjectID); ok {
				apiIDs = append(apiIDs, id)
			}
		}
	}
	apiCursor.Close(ctx)
	_, err = testCaseCollection.UpdateMany(ctx, bson.M{"api_id": bson.M{"$in": apiIDs}}, bson.M{
		"$set": bson.M{"api_id": nil},
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": "Failed to anonymize test cases"})
		return
	}

	testResultCollection := config.MongoDB.Collection("test_results")
	testCaseCursor, err := testCaseCollection.Find(ctx, bson.M{"api_id": bson.M{"$in": apiIDs}})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": "Failed to fetch test cases for anonymizing test results"})
		return
	}
	var testCaseIDs []bson.ObjectID
	for testCaseCursor.Next(ctx) {
		var testCase bson.M
		if err := testCaseCursor.Decode(&testCase); err == nil {
			if id, ok := testCase["_id"].(bson.ObjectID); ok {
				testCaseIDs = append(testCaseIDs, id)
			}
		}
	}
	testCaseCursor.Close(ctx)
	_, err = testResultCollection.UpdateMany(ctx, bson.M{"test_case_id": bson.M{"$in": testCaseIDs}}, bson.M{
		"$set": bson.M{"test_case_id": nil},
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": "Failed to anonymize test results"})
		return
	}

	// 5. Respond with success
	c.JSON(http.StatusOK, gin.H{"success": true, "message": "User deleted successfully"})
}

/*
What to keep in mind when deleting the user details
- Things that has to go!
	- Profile and credentials
	- All personally linked purchase and billing info
- Things that can be anonymized, we can keep all of this but it can't be directly linked to the person/individual who created it.
	- API details
	- Test Case details
	- Usage logs
	- Content authored
	- Aggregate metrics
*/
