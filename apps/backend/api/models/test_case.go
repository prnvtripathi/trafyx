package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type TestCase struct {
	ID          primitive.ObjectID `bson:"_id,omitempty"` // MongoDB's ObjectId
	Name        string             `bson:"name"`
	Method      string             `bson:"method"`
	URL         string             `bson:"url"`
	Headers     string             `bson:"headers"`
	Payload     string             `bson:"payload"`
	Description string             `bson:"description"`
}
