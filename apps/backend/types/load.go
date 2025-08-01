package types

type LoadTestRequest struct {
	APIId    string `json:"api_id"`
	Rate     int    `json:"rate"`              // Requests per second
	Duration int    `json:"duration"`          // Duration in seconds
	Payload  string `json:"payload,omitempty"` // Optional payload for POST requests
	Headers  string `json:"headers,omitempty"` // Optional headers in JSON format
}
