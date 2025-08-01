package models

import "go.mongodb.org/mongo-driver/v2/bson"

// UserAPI represents the structure for storing API information provided by a user
type UserAPI struct {
	ID          bson.ObjectID `bson:"_id,omitempty" json:"id"`        // MongoDB's ObjectID
	UserID      bson.ObjectID `bson:"user_id" json:"user_id"`         // To identify the user
	Name        string        `bson:"name" json:"name"`               // API name
	Method      string        `bson:"method" json:"method"`           // HTTP Method (GET, POST, etc.)
	URL         string        `bson:"url" json:"url"`                 // Endpoint URL
	Headers     string        `bson:"headers" json:"headers"`         // JSON string for headers
	Payload     string        `bson:"payload" json:"payload"`         // Request payload for POST/PUT
	Description string        `bson:"description" json:"description"` // Description of the API
	CreatedAt   bson.DateTime `bson:"created_at" json:"created_at"`   // Timestamp
	UpdatedAt   bson.DateTime `bson:"updated_at" json:"updated_at"`   // Timestamp
}
