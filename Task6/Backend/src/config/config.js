import dotenv from "dotenv";
dotenv.config();

const _config = {
  PORT: process.env.PORT || 8080,
  MONGO_URI: process.env.MONGO_URL || "mongodb://localhost:27017/task6",
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME,
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
};

const config = Object.freeze(_config);

export default config;
