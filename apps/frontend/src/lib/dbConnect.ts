/**
 * Connects to the MongoDB database using the provided MONGODB_URI.
 *
 * @param {string} db - The name of the database to connect to.
 * @returns {Promise<mongoose.Connection>} - A promise that resolves to the mongoose connection object.
 * @throws {Error} - If the MONGODB_URI environment variable is not defined.
 */
import mongoose, { Connection } from "mongoose"; //mongoose for all the mongo related things

const MONGODB_URI = process.env.MONGODB_URI; //.env.local

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

type MongooseGlobal = {
  conn: Connection | null;
  promise: Promise<Connection> | null;
};

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached: MongooseGlobal = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<Connection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      return mongoose.connection;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
