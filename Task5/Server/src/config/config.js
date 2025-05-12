import dotenv from "dotenv";
dotenv.config();

const _config = {
  PORT: process.env.PORT || 3000,
  DB_URL: process.env.DB_URL || "mongodb://localhost:27017/myapp",
  JWT_SECRET: process.env.JWT_SECRET || "your_jwt_secret",
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || "1h",
  COOKIE_SECRET: process.env.COOKIE_SECRET || "your_cookie_secret",
  NODE_ENV: process.env.NODE_ENV || "development",
};

const config = Object.freeze(_config);
export default config;
