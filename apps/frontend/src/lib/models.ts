import mongoose from "mongoose";

// User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
      min: 3,
      max: 20,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },

    phone: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

// User API Schema
const userApiSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    headers: {
      type: String,
      required: true,
    },
    payload: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, collection: "user-apis" }
);

// Test Case Schema
const testCaseSchema = new mongoose.Schema(
  {
    api_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserApi",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    headers: {
      type: String,
      required: true,
    },
    payload: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    expected_outcome: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, collection: "test-cases" }
);

// Exporting the Test Case model
export const TestCase =
  mongoose.models.TestCase || mongoose.model("TestCase", testCaseSchema);

// Exporting the User API model
export const UserApi =
  mongoose.models.UserApi || mongoose.model("UserApi", userApiSchema);

// Exporting the models
export const User = mongoose.models.User || mongoose.model("User", userSchema);
