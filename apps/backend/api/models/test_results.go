package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type TestResult struct {
	ID              primitive.ObjectID `bson:"_id,omitempty"`
	TestCaseID      primitive.ObjectID `json:"test_case_id" bson:"test_case_id"`
	StatusCode      int                `json:"status_code" bson:"status_code"`
	Response        string             `json:"response" bson:"response"`
	ExpectedOutcome int                `json:"expected_outcome" bson:"expected_outcome,omitempty"`
	TestResult      bool               `json:"test_result" bson:"test_result"`
	Duration        float64            `json:"duration" bson:"duration"`
	ExecutedAt      primitive.DateTime `json:"executed_at,omitempty" bson:"executed_at,omitempty"`
}
