package models

import "go.mongodb.org/mongo-driver/v2/bson"

type TestCase struct {
	ID              bson.ObjectID `bson:"_id,omitempty" json:"_id"`                  // MongoDB's ObjectID
	CreatedAt       bson.DateTime `bson:"created_at,omitempty" json:"created_at"`   // Creation timestamp
	UpdatedAt       bson.DateTime `bson:"updated_at,omitempty" json:"updated_at"`   // Last update timestamp
	APIID           bson.ObjectID `bson:"api_id,omitempty" json:"api_id"`           // Associated API ID
	Name            string        `bson:"name" json:"name"`                         // Test case name
	Method          string        `bson:"method" json:"method"`                     // HTTP method
	URL             string        `bson:"url" json:"url"`                           // Endpoint URL
	Headers         string        `bson:"headers" json:"headers"`                   // JSON string for headers
	Payload         string        `bson:"payload" json:"payload"`                   // Request payload
	Description     string        `bson:"description" json:"description"`           // Test case description
	ExpectedOutcome int           `bson:"expected_outcome" json:"expected_outcome"` // Expected HTTP status code
	CreatedBy       string        `bson:"created_by,omitempty" json:"created_by"`   // Indicates who created the test case
}
