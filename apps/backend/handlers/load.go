package handlers

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"time"

	"trafyx/backend/api/models"
	"trafyx/backend/config"
	"trafyx/backend/types"

	"github.com/gin-gonic/gin"
	vegeta "github.com/tsenart/vegeta/v12/lib"
	"go.mongodb.org/mongo-driver/v2/bson"
)

// LoadTest handles the load test request using stored API configuration.
func LoadTest(c *gin.Context) {
	var request types.LoadTestRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		log.Printf("Invalid JSON format: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request format", "details": err.Error()})
		return
	}

	// Fetch API configuration from MongoDB
	apiDetails, err := fetchAPIDetails(request.APIId)
	if err != nil {
		log.Printf("Failed to fetch API details: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve API details", "details": err.Error()})
		return
	}

	// Set defaults if not provided in request
	if request.Rate <= 0 {
		request.Rate = 10
	}
	if request.Duration <= 0 {
		request.Duration = 10
	}

	// Determine headers: prefer request.Headers if present and valid
	headers := http.Header{}
	if request.Headers != "" {
		var headerMap map[string]string
		if err := json.Unmarshal([]byte(request.Headers), &headerMap); err != nil {
			log.Printf("Invalid request headers format: %v", err)
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request headers format", "details": err.Error()})
			return
		}
		for key, value := range headerMap {
			headers.Set(key, value)
		}
	} else if apiDetails.Headers != "" {
		var headerMap map[string]string
		if err := json.Unmarshal([]byte(apiDetails.Headers), &headerMap); err != nil {
			log.Printf("Invalid DB headers format: %v", err)
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid DB headers format", "details": err.Error()})
			return
		}
		for key, value := range headerMap {
			headers.Set(key, value)
		}
	}

	// Determine payload: prefer request.Payload if present and valid
	payload := []byte(apiDetails.Payload)
	if request.Payload != "" {
		var js json.RawMessage
		if err := json.Unmarshal([]byte(request.Payload), &js); err != nil {
			log.Printf("Invalid request payload format: %v", err)
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload format", "details": err.Error()})
			return
		}
		payload = []byte(request.Payload)
	}

	// Setup Vegeta target
	target := vegeta.Target{
		Method: apiDetails.Method,
		URL:    apiDetails.URL,
		Body:   payload,
		Header: headers,
	}

	rate := vegeta.ConstantPacer{Freq: request.Rate, Per: time.Second}
	duration := time.Duration(request.Duration) * time.Second
	attacker := vegeta.NewAttacker()
	targeter := vegeta.NewStaticTargeter(target)

	var metrics vegeta.Metrics
	for res := range attacker.Attack(targeter, rate, duration, "Load Test") {
		metrics.Add(res)
	}
	metrics.Close()

	c.JSON(http.StatusOK, gin.H{
		"api_name": apiDetails.Name,
		"requests": metrics.Requests,
		"success":  metrics.Success,
		"latencies": gin.H{
			"mean": metrics.Latencies.Mean.String(),
			"p50":  metrics.Latencies.P50.String(),
			"p95":  metrics.Latencies.P95.String(),
			"p99":  metrics.Latencies.P99.String(),
		},
		"data": gin.H{
			"bytes_in":        metrics.BytesIn.Mean,
			"bytes_in_total":  metrics.BytesIn.Total,
			"bytes_out":       metrics.BytesOut.Mean,
			"bytes_out_total": metrics.BytesOut.Total,
		},
		"duration":     metrics.Duration.String(),
		"wait":         metrics.Wait.String(),
		"status_codes": metrics.StatusCodes,
		"throughput":   metrics.Throughput,
		"errors":       metrics.Errors,
	})
}

// fetchAPIDetails retrieves a UserAPI document from MongoDB by ID.
func fetchAPIDetails(api_id string) (models.UserAPI, error) {
	apiObjId, err := bson.ObjectIDFromHex(api_id)
	if err != nil {
		return models.UserAPI{}, err
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	apiCollection := config.MongoDB.Collection("user_apis")
	var api models.UserAPI
	err = apiCollection.FindOne(ctx, bson.M{"_id": apiObjId}).Decode(&api)
	if err != nil {
		return models.UserAPI{}, err
	}

	return api, nil
}
