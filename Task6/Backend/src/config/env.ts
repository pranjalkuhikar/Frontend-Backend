import { z } from "zod";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.string().transform(Number).default("8080"),
  MONGODB_URI: z.string().url().default("mongodb://localhost:27017/task6"),
  JWT_SECRET: z
    .string()
    .min(32)
    .default("development_secret_key_min_32_chars_long_12345"),
  JWT_EXPIRATION_TIME: z.string().default("1d"),
  FRONTEND_URL: z.string().url().default("http://localhost:5173"),
  REDIS_URL: z.string().url().default("redis://localhost:6379"),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().transform(Number).optional(),
  SMTP_SECURE: z
    .string()
    .transform((val) => val === "true")
    .optional(),
  SMTP_USER: z.string().email().optional(),
  SMTP_PASS: z.string().optional(),
  SMTP_FROM: z.string().email().optional(),
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
});

// Validate environment variables
const env = envSchema.parse(process.env);

export default env;
