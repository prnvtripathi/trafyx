package config

import (
	"context"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var MongoDB *mongo.Database

func ConnectDatabase() {
	// Use the new recommended way to create a client
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Use the new ServerAPI option to specify the stable API version
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	databaseUrl := os.Getenv("MONGODB_URI")

	// Combine connection options
	opts := options.Client().
		ApplyURI(databaseUrl).
		SetServerAPIOptions(serverAPI).
		SetRetryWrites(true).
		SetRetryReads(true)

	// Use the new recommended client creation method
	client, err := mongo.Connect(ctx, opts)
	if err != nil {
		log.Fatalf("Failed to create MongoDB client: %v", err)
	}

	// Verify the connection
	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatalf("Failed to ping MongoDB: %v", err)
	}

	MongoDB = client.Database("api_testing") // Replace with your database name
	log.Println("Connected to MongoDB!")
}

// Optional: Add a function to close the connection when needed
func DisconnectDatabase(client *mongo.Client) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := client.Disconnect(ctx); err != nil {
		log.Fatalf("Error disconnecting from MongoDB: %v", err)
	}
}
