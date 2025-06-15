import dotenv from "dotenv";
dotenv.config();

interface Config {
  PORT: number;
  MONGO_URI: string;
  JWT_SECRET: string;
  JWT_EXPIRATION_TIME: string;
  FRONTEND_URL: string;
  NODE_ENV: string;
  CLOUDINARY_CLOUD_NAME?: string;
  CLOUDINARY_API_KEY?: string;
  CLOUDINARY_API_SECRET?: string;
  REDIS_URL: string;
  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_SECURE: boolean;
  SMTP_USER: string;
  SMTP_PASS: string;
  SMTP_FROM: string;
}

const _config: Config = {
  PORT: Number(process.env.PORT) || 8080,
  MONGO_URI: process.env.MONGO_URL || "mongodb://localhost:27017/task6",
  JWT_SECRET:
    process.env.JWT_SECRET ||
    "your_super_secret_key_here_min_32_chars_long_enough",
  JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME || "1d",
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
  NODE_ENV: process.env.NODE_ENV || "development",
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "dtgy2l0qv",
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "546856289825562",
  CLOUDINARY_API_SECRET:
    process.env.CLOUDINARY_API_SECRET || "1iZR4zDM1_zkKW7L-HNZ2f9hfRw",
  REDIS_URL:
    process.env.REDIS_URL ||
    "redis://default:wtGmdXWoMNvCSXIsADLUFqjCb4zxfTtk@redis-17358.c84.us-east-1-2.ec2.redns.redis-cloud.com:17358",
  SMTP_HOST: process.env.SMTP_HOST || "smtp.gmail.com",
  SMTP_PORT: Number(process.env.SMTP_PORT) || 587,
  SMTP_SECURE: process.env.SMTP_SECURE === "true" || false,
  SMTP_USER: process.env.SMTP_USER || "pranjalkuhikar123@gmail.com",
  SMTP_PASS: process.env.SMTP_PASS || "ipuzkiynmdjwzenb",
  SMTP_FROM: process.env.SMTP_FROM || "pranjalkuhikar123@gmail.com",
};

const config: Readonly<Config> = Object.freeze(_config);

export default config;
