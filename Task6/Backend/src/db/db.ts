import mongoose from "mongoose";
import config from "../config/config.js";
import { logger } from "../utils/logger.js";
import { AddUserIndexes } from "./migrations/001-add-user-indexes.js";
import { AddUserTimestamps } from "./migrations/002-add-user-timestamps.js";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose
      .connect(config.MONGO_URI)
      .then(async () => {
        logger.info("MongoDB connected");

        // Run migrations
        try {
          const migrations = [new AddUserIndexes(), new AddUserTimestamps()];

          for (const migration of migrations) {
            await migration.up();
          }
        } catch (error) {
          logger.error("Migration error:", error);
          throw error;
        }
      })
      .catch((err: Error) => logger.error("MongoDB connection error: ", err));
  } catch (error) {
    logger.error("Database connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
