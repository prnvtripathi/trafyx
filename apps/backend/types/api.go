package types

import "go.mongodb.org/mongo-driver/v2/bson"

type APISaveRequest struct {
	UserID      bson.ObjectID `json:"user_id"`     // To identify the user
	Name        string        `json:"name"`        // API name
	Method      string        `json:"method"`      // HTTP Method (GET, POST, etc.)
	URL         string        `json:"url"`         // Endpoint URL
	Headers     string        `json:"headers"`     // JSON string for headers
	Payload     string        `json:"payload"`     // Request payload for POST/PUT
	Description string        `json:"description"` // Description of the API
}
