package services

import (
	"bytes"
	"fmt"
	"mime/multipart"
	"net/http"
)

func ExecuteAPITest(apiID string) error {
	// Validate the input
	if apiID == "" {
		return fmt.Errorf("API ID cannot be empty")
	}

	// Define the API endpoint
	url := "http://localhost:8080/api/v1/executions/apilux/execute_api_tests"

	// Create a buffer to hold the multipart form data
	body := &bytes.Buffer{}
	writer := multipart.NewWriter(body)

	// Add the form field for 'api_id'
	err := writer.WriteField("api_id", apiID)
	if err != nil {
		return fmt.Errorf("failed to write api_id field: %v", err)
	}

	// Close the writer to finalize the multipart form data
	err = writer.Close()
	if err != nil {
		return fmt.Errorf("failed to close writer: %v", err)
	}

	// Create a new HTTP request
	req, err := http.NewRequest("POST", url, body)
	if err != nil {
		return fmt.Errorf("failed to create request: %v", err)
	}

	// Set the appropriate content type
	req.Header.Set("Content-Type", writer.FormDataContentType())

	// Perform the HTTP request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return fmt.Errorf("failed to send request: %v", err)
	}
	defer resp.Body.Close()

	// Log the response status
	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("unexpected response status: %v", resp.Status)
	}

	fmt.Println("API test executed successfully with status:", resp.Status)
	return nil
}
