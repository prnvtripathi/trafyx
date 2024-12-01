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

// Exporting the models
export const User = mongoose.models.User || mongoose.model("User", userSchema);
