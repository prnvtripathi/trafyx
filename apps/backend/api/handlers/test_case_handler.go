package handlers

import (
	"backend/api/models"
	"backend/config"
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
)

func AddTestCase(tc models.TestCase) error {
	collection := config.MongoDB.Collection("test_cases")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	_, err := collection.InsertOne(ctx, tc)
	if err != nil {
		log.Printf("Failed to insert test case: %v", err)
		return err
	}

	return nil
}

func GetAllTestCases() ([]models.TestCase, error) {
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

	return testCases, nil
}