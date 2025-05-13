import dotenv from "dotenv";
dotenv.config();

const _config = {
  PORT: process.env.PORT || 3000,
  DB_URL: process.env.DB_URL || "mongodb://localhost:27017/myapp",
  JWT_SECRET: process.env.JWT_SECRET || "your_jwt_secret",
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || "1h",
  COOKIE_SECRET: process.env.COOKIE_SECRET || "your_cookie_secret",
  NODE_ENV: process.env.NODE_ENV || "development",
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:3000",
  CORS_METHODS: process.env.CORS_METHODS || "GET,HEAD,PUT,PATCH,POST,DELETE",
  CORS_ALLOWED_HEADERS:
    process.env.CORS_ALLOWED_HEADERS || "Content-Type,Authorization",
  CORS_CREDENTIALS: process.env.CORS_CREDENTIALS || true,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
};

const config = Object.freeze(_config);
export default config;
