package models

import "go.mongodb.org/mongo-driver/v2/bson"

type TestResult struct {
	ID              bson.ObjectID `bson:"_id,omitempty" json:"id"`                  // MongoDB's ObjectID
	TestCaseID      bson.ObjectID `bson:"test_case_id" json:"test_case_id"`         // Associated test case ID
	StatusCode      int           `bson:"status_code" json:"status_code"`           // HTTP status code
	Response        string        `bson:"response" json:"response"`                 // Response body
	ExpectedOutcome int           `bson:"expected_outcome" json:"expected_outcome"` // Expected HTTP status code
	TestResult      bool          `bson:"test_result" json:"test_result"`           // Test result (pass/fail)
	Duration        float64       `bson:"duration" json:"duration"`                 // Execution duration in seconds
	ExecutedAt      bson.DateTime `bson:"executed_at,omitempty" json:"executed_at"` // Execution timestamp
	RunCount        int           `bson:"run_count" json:"run_count"`               // Number of times the test was run
}
