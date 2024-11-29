package models

import "go.mongodb.org/mongo-driver/bson/primitive"

// UserAPI represents the structure for storing API information provided by a user
type UserAPI struct {
	ID          primitive.ObjectID `bson:"_id,omitempty"` // MongoDB's ObjectID
	UserID      string             `bson:"user_id"`       // To identify the user
	Name        string             `bson:"name"`          // API name
	Method      string             `bson:"method"`        // HTTP Method (GET, POST, etc.)
	URL         string             `bson:"url"`           // Endpoint URL
	Headers     string             `bson:"headers"`       // JSON string for headers
	Payload     string             `bson:"payload"`       // Request payload for POST/PUT
	Description string             `bson:"description"`   // Description of the API
	CreatedAt   primitive.DateTime `bson:"created_at"`    // Timestamp
	UpdatedAt   primitive.DateTime `bson:"updated_at"`    // Timestamp
}
