package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"time"
)

type TestResult struct {
	ID         primitive.ObjectID `bson:"_id,omitempty"`   // Unique ID for the result
	TestCaseID primitive.ObjectID `bson:"test_case_id"`    // Reference to the test case
	UserAPIID  primitive.ObjectID `bson:"user_api_id"`     // Reference to the user's API
	StatusCode int                `bson:"status_code"`     // HTTP status code
	Response   string             `bson:"response"`        // Response text
	Duration   time.Duration      `bson:"duration"`        // Execution time
	ResultType string             `bson:"result_type"`     // Type of result (happy path, negative, edge case)
	Error      string             `bson:"error,omitempty"` // Error message (if any)
	ExecutedAt time.Time          `bson:"executed_at"`     // Time of execution
}
