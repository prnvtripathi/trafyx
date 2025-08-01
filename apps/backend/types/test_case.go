package types

import (
	"trafyx/backend/api/models"
)

type AddTestCaseRequest struct {
	TestCases []models.TestCase `json:"testCases"`
}

type GenerateTestCaseRequest struct {
	APIId     string `json:"api_id"`
	CreatedBy string `json:"created_by"`
}
