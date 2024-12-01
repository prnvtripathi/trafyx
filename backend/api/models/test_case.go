package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type TestCase struct {
	ID              primitive.ObjectID `bson:"_id,omitempty"` // MongoDB's ObjectID
	CreatedAt       primitive.DateTime `json:"created_at,omitempty"`
	APIID           primitive.ObjectID `json:"api_id,omitempty"`
	Name            string             `json:"name"`
	Method          string             `json:"method"`
	URL             string             `json:"url"`
	Headers         string             `json:"headers"`
	Payload         string             `json:"payload"`
	Description     string             `json:"description"`
	ExpectedOutcome int                `json:"expected_outcome"`
}
