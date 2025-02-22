package main

import (
	"fmt"
	"log"
	"os"

	"backend/api/routes"
	"backend/config"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Load .env only if running locally (not in production)
	env := os.Getenv("ENVIRONMENT") // Assume "APP_ENV" determines the environment
	if env != "production" {
		err := godotenv.Load(".env")
		if err != nil {
			log.Printf("Warning: No .env file found. Continuing without it.")
		} else {
			fmt.Println("Environment variables loaded from .env")
		}
	}
	config.ConnectDatabase()

	// Connect to Redis
	err := config.ConnectRedis()
	if err != nil {
		log.Fatalf("Redis connection failed: %v", err)
	}

	r := gin.Default()
	routes.RegisterRoutes(r)

	r.Run(":5000") // Start the server
}
