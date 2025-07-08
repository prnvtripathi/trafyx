package handlers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	vegeta "github.com/tsenart/vegeta/v12/lib"
)

// LoadTestParams defines the expected JSON payload for the load test.
type LoadTestParams struct {
	URL      string `json:"url"`      // Target URL to load test
	Method   string `json:"method"`   // HTTP method to use (default: GET)
	Rate     int    `json:"rate"`     // Requests per second
	Duration int    `json:"duration"` // Duration in seconds
	Payload  string `json:"payload"`  // Optional request body
}

// ExecuteLoadTest runs a load test on the specified API endpoint using Vegeta.
func ExecuteLoadTest(c *gin.Context) {
	var params LoadTestParams
	// Parse JSON parameters from the request body.
	if err := c.ShouldBindJSON(&params); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid parameters: " + err.Error()})
		return
	}

	// Set defaults if necessary.
	if params.Method == "" {
		params.Method = "GET"
	}
	if params.Rate <= 0 {
		params.Rate = 10
	}
	if params.Duration <= 0 {
		params.Duration = 10
	}

	// Convert parameters for Vegeta.
	rate := vegeta.ConstantPacer{Freq: params.Rate, Per: time.Second}
	duration := time.Duration(params.Duration) * time.Second

	// Define the target for the load test.
	target := vegeta.Target{
		Method: params.Method,
		URL:    params.URL,
		Body:   []byte(params.Payload),
	}
	targeter := vegeta.NewStaticTargeter(target)
	attacker := vegeta.NewAttacker()

	// Run the load test and accumulate the metrics.
	var metrics vegeta.Metrics
	for res := range attacker.Attack(targeter, rate, duration, "Load Test") {
		metrics.Add(res)
	}
	metrics.Close()

	// Prepare a summary of the load test results.
	results := gin.H{
		"requests": metrics.Requests,
		"success":  metrics.Success,
		"latencies": gin.H{
			"mean": metrics.Latencies.Mean.String(),
			"p50":  metrics.Latencies.P50.String(),
			"p95":  metrics.Latencies.P95.String(),
			"p99":  metrics.Latencies.P99.String(),
		},
		"throughput": metrics.Throughput,
		"errors":     metrics.Errors,
	}

	// Return the results as JSON.
	c.JSON(http.StatusOK, results)
}
