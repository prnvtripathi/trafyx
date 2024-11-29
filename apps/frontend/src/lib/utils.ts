import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import mongoose from "mongoose";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const connection = {};

export const connectToDB = async () => {
  try {
    if (connection.isConnected) return;
    const db = await mongoose.connect(process.env.MONGO);
    connection.isConnected = db.connections[0].readyState;
    console.log("Successfully connected to the database");
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};