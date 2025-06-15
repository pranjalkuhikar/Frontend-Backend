import mongoose from "mongoose";
import { logger } from "../../utils/logger.js";

export abstract class Migration {
  protected abstract name: string;
  protected abstract version: number;

  public async up(): Promise<void> {
    try {
      logger.info(`Running migration: ${this.name}`);
      await this.migrate();
      await this.recordMigration();
      logger.info(`Completed migration: ${this.name}`);
    } catch (error) {
      logger.error(`Migration failed: ${this.name}`, error);
      throw error;
    }
  }

  protected abstract migrate(): Promise<void>;

  private async recordMigration(): Promise<void> {
    const collection = mongoose.connection.collection("migrations");
    await collection.insertOne({
      name: this.name,
      version: this.version,
      timestamp: new Date(),
    });
  }

  public static async getCompletedMigrations(): Promise<string[]> {
    const collection = mongoose.connection.collection("migrations");
    const migrations = await collection.find().toArray();
    return migrations.map((m) => m.name);
  }
}
