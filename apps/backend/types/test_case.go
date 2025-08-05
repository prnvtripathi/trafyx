package types

import (
	"trafyx/backend/api/models"
)

type AddTestCaseRequest struct {
	TestCases []models.TestCase `json:"test_cases"`
}

type GenerateTestCaseRequest struct {
	APIId     string `json:"api_id"`
	CreatedBy string `json:"created_by"`
}

type UpdateTestCaseRequest struct {
	TestCaseId string          `json:"_id"`
	TestCase   models.TestCase `json:"test_case"`
}

type DeleteTestCaseRequest struct {
	TestCaseId string `json:"_id"`
}
