package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"

	"trafyx/backend/api/routes"
	"trafyx/backend/config"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Load .env only if running locally (not in production)
	err := godotenv.Load(".env")
	if err != nil {
		log.Printf("Warning: No .env file found. Continuing without it.")
	} else {
		fmt.Println("Environment variables loaded from .env")
	}
	config.ConnectDatabase()

	// Set up graceful shutdown
	defer func() {
		if config.MongoClient != nil {
			ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
			defer cancel()
			if err := config.MongoClient.Disconnect(ctx); err != nil {
				log.Printf("Error disconnecting from MongoDB: %v", err)
			} else {
				fmt.Println("Disconnected from MongoDB")
			}
		}
	}()

	// Handle shutdown signals
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt, syscall.SIGTERM)
	go func() {
		<-c
		fmt.Println("\nShutting down gracefully...")
		os.Exit(0)
	}()

	r := gin.Default()

	// Add CORS middleware
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "https://trafyx.kyrexi.tech"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	routes.RegisterRoutes(r)

	port := os.Getenv("PORT") // Port number from the env
	if port == "" {
		port = "5000"
	}

	r.Run(":" + port) // Start the server
}
