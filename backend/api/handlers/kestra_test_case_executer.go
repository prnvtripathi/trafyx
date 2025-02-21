package handlers

import (
	"bytes"
	"fmt"
	"github.com/gin-gonic/gin"
	"mime/multipart"
	"net/http"
)

func ExecuteAPITest(c *gin.Context) {
	apiId := c.Query("api_id")
	// Validate the input
	if apiId == "" {
		fmt.Println("API ID cannot be empty")
	}

	// Define the API endpoint
	url := "http://localhost:8080/api/v1/executions/apilux/execute_api_tests"

	// Create a buffer to hold the multipart form data
	body := &bytes.Buffer{}
	writer := multipart.NewWriter(body)

	// Add the form field for 'api_id'
	err := writer.WriteField("api_id", apiId)
	if err != nil {
		fmt.Printf("failed to write api_id field: %v\n", err)
	}

	// Close the writer to finalize the multipart form data
	err = writer.Close()
	if err != nil {
		fmt.Printf("failed to close writer: %v", err)
	}

	// Create a new HTTP request
	req, err := http.NewRequest("POST", url, body)
	if err != nil {
		fmt.Printf("failed to create request: %v", err)
	}

	// Set the appropriate content type
	req.Header.Set("Content-Type", writer.FormDataContentType())

	// Perform the HTTP request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Printf("failed to send request: %v", err)
	}
	defer resp.Body.Close()

	// Log the response status
	if resp.StatusCode != http.StatusOK {
		fmt.Printf("unexpected response status: %v", resp.Status)
	}

	fmt.Printf("API test executed successfully with status:", resp.Status)
}
