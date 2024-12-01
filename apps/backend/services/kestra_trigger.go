package services

import (
	"bytes"
	"encoding/json"
	"errors"
	"net/http"
)

type KestraTriggerResponse struct {
	ID     string `json:"id"`
	Status string `json:"status"`
}

// TriggerKestraWorkflow triggers a Kestra workflow for the given user API ID.
func TriggerKestraWorkflow(userAPIID string) (KestraTriggerResponse, error) {
	workflowID := "api-testing.execute-api-tests"
	kestraURL := "http://kestra-api-endpoint:8080/api/v1/executions"
	token := "your-kestra-api-token"

	requestBody := map[string]interface{}{
		"namespace": "api-testing",
		"id":        workflowID,
		"inputs": map[string]interface{}{
			"user_api_id": userAPIID,
		},
	}

	body, err := json.Marshal(requestBody)
	if err != nil {
		return KestraTriggerResponse{}, err
	}

	req, err := http.NewRequest("POST", kestraURL, bytes.NewBuffer(body))
	if err != nil {
		return KestraTriggerResponse{}, err
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+token)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return KestraTriggerResponse{}, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return KestraTriggerResponse{}, errors.New("failed to trigger Kestra workflow")
	}

	var kestraResp KestraTriggerResponse
	err = json.NewDecoder(resp.Body).Decode(&kestraResp)
	if err != nil {
		return KestraTriggerResponse{}, err
	}

	return kestraResp, nil
}
