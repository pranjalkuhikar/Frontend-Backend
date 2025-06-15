import { createClient } from "redis";
import { logger } from "../utils/logger.js";
import config from "../config/config.js";

class RedisService {
  private client;
  private isConnected: boolean = false;

  constructor() {
    this.client = createClient({
      url: config.REDIS_URL,
    });

    this.client.on("error", (err) => {
      logger.error("Redis Client Error:", err);
      this.isConnected = false;
    });

    this.client.on("connect", () => {
      logger.info("Redis Client Connected");
      this.isConnected = true;
    });

    this.client.on("end", () => {
      logger.info("Redis Client Disconnected");
      this.isConnected = false;
    });
  }

  private async ensureConnection() {
    if (!this.isConnected) {
      try {
        await this.client.connect();
      } catch (error) {
        logger.error("Redis Connection Error:", error);
        throw error;
      }
    }
  }

  async connect(): Promise<void> {
    await this.ensureConnection();
  }

  async set(key: string, value: string, expirySeconds?: number): Promise<void> {
    try {
      await this.ensureConnection();
      if (expirySeconds) {
        await this.client.set(key, value, { EX: expirySeconds });
      } else {
        await this.client.set(key, value);
      }
    } catch (error) {
      logger.error("Redis Set Error:", error);
      throw error;
    }
  }

  async get(key: string): Promise<string | null> {
    try {
      await this.ensureConnection();
      return await this.client.get(key);
    } catch (error) {
      logger.error("Redis Get Error:", error);
      throw error;
    }
  }

  async del(key: string): Promise<void> {
    try {
      await this.ensureConnection();
      await this.client.del(key);
    } catch (error) {
      logger.error("Redis Delete Error:", error);
      throw error;
    }
  }

  async setHash(key: string, data: Record<string, string>): Promise<void> {
    try {
      await this.client.hSet(key, data);
    } catch (error) {
      logger.error("Redis Hash Set Error:", error);
      throw error;
    }
  }

  async getHash(key: string): Promise<Record<string, string>> {
    try {
      return await this.client.hGetAll(key);
    } catch (error) {
      logger.error("Redis Hash Get Error:", error);
      throw error;
    }
  }

  async setList(key: string, values: string[]): Promise<void> {
    try {
      await this.client.lPush(key, values);
    } catch (error) {
      logger.error("Redis List Set Error:", error);
      throw error;
    }
  }

  async getList(
    key: string,
    start: number = 0,
    end: number = -1
  ): Promise<string[]> {
    try {
      return await this.client.lRange(key, start, end);
    } catch (error) {
      logger.error("Redis List Get Error:", error);
      throw error;
    }
  }

  async increment(key: string): Promise<number> {
    try {
      return await this.client.incr(key);
    } catch (error) {
      logger.error("Redis Increment Error:", error);
      throw error;
    }
  }

  async decrement(key: string): Promise<number> {
    try {
      return await this.client.decr(key);
    } catch (error) {
      logger.error("Redis Decrement Error:", error);
      throw error;
    }
  }

  async setWithTags(
    key: string,
    value: string,
    tags: string[],
    expiry?: number
  ): Promise<void> {
    try {
      await this.set(key, value, expiry);
      for (const tag of tags) {
        await this.client.sAdd(`tag:${tag}`, key);
      }
    } catch (error) {
      logger.error("Redis Set With Tags Error:", error);
      throw error;
    }
  }

  async getByTag(tag: string): Promise<string[]> {
    try {
      const keys = await this.client.sMembers(`tag:${tag}`);
      const values = await Promise.all(keys.map((key) => this.get(key)));
      return values.filter((value): value is string => value !== null);
    } catch (error) {
      logger.error("Redis Get By Tag Error:", error);
      throw error;
    }
  }

  async clearByTag(tag: string): Promise<void> {
    try {
      const keys = await this.client.sMembers(`tag:${tag}`);
      await Promise.all([
        ...keys.map((key) => this.del(key)),
        this.client.del(`tag:${tag}`),
      ]);
    } catch (error) {
      logger.error("Redis Clear By Tag Error:", error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (this.isConnected) {
      await this.client.quit();
      this.isConnected = false;
    }
  }

  async ping(): Promise<boolean> {
    try {
      await this.ensureConnection();
      const result = await this.client.ping();
      return result === "PONG";
    } catch (error) {
      logger.error("Redis Ping Error:", error);
      return false;
    }
  }
}

export const redisService = new RedisService();
