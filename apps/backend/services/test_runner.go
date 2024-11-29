package services

import (
	"bytes"
	"encoding/json"
	// "fmt"
	"context"
	"io"
	"net/http"
	"time"

	"backend/api/models"
	"backend/config"
	"go.mongodb.org/mongo-driver/bson"
)

type TestResult struct {
	TestCaseID string
	StatusCode int
	Response   string
	Duration   time.Duration
}

func ExecuteTests() ([]TestResult, error) {
	collection := config.MongoDB.Collection("test_cases")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	cursor, err := collection.Find(ctx, bson.D{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var testCases []models.TestCase
	if err = cursor.All(ctx, &testCases); err != nil {
		return nil, err
	}

	var results []TestResult

	for _, tc := range testCases {
		start := time.Now()

		client := &http.Client{}
		reqBody := bytes.NewBufferString(tc.Payload)
		req, err := http.NewRequest(tc.Method, tc.URL, reqBody)
		if err != nil {
			return nil, err
		}

		// Add headers
		var headers map[string]string
		json.Unmarshal([]byte(tc.Headers), &headers)
		for key, value := range headers {
			req.Header.Set(key, value)
		}

		resp, err := client.Do(req)
		if err != nil {
			return nil, err
		}
		defer resp.Body.Close()

		body, _ := io.ReadAll(resp.Body)
		duration := time.Since(start)

		results = append(results, TestResult{
			TestCaseID: tc.ID.Hex(),
			StatusCode: resp.StatusCode,
			Response:   string(body),
			Duration:   duration,
		})
	}

	return results, nil
}
