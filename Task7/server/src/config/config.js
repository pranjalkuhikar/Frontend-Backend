import dotenv from "dotenv";
dotenv.config();

const _config = {
  PORT: process.env.PORT || 3000,
  DB_URL: process.env.DB_URL || "mongodb://localhost:27017/myapp",
  SECRET_KEY: process.env.SECRET_KEY,
  EXPIRE_KEY: process.env.EXPIRE_KEY,
};

const config = Object.freeze(_config);
export default config;
