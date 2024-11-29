package models

import "gorm.io/gorm"

type TestCase struct {
	gorm.Model
	Name        string `json:"name"`
	Method      string `json:"method"`
	URL         string `json:"url"`
	Headers     string `json:"headers"` // JSON string for headers
	Payload     string `json:"payload"` // JSON string for request body
	Description string `json:"description"`
}
