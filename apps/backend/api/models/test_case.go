package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type TestCase struct {
	ID              primitive.ObjectID `json:"id,omitempty"`
	CreatedAt       primitive.DateTime `json:"created_at,omitempty"`
	APIID           string             `json:"api_id,omitempty"`
	Name            string             `json:"name"`
	Method          string             `json:"method"`
	URL             string             `json:"url"`
	Headers         string             `json:"headers"` // Change to map[string]string
	Payload         string             `json:"payload"` // Ensure it can handle dynamic payloads
	Description     string             `json:"description"`
	ExpectedOutcome string             `json:"expected_outcome"` // Handle nested outcomes dynamically
}
