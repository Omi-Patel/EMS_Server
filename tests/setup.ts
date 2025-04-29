import mongoose from "mongoose";
import dotenv from "dotenv";

// Set test environment variables
process.env.JWT_SECRET = "test-jwt-secret";
process.env.JWT_COOKIE_EXPIRES_IN = "90";
process.env.NODE_ENV = "test";
process.env.MONGODB_URI = "mongodb://localhost:27017/event-management-test";

beforeAll(async () => {
  // Connect to test database
  await mongoose.connect(process.env.MONGODB_URI as string);
});

afterAll(async () => {
  // Cleanup and close connection
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});
