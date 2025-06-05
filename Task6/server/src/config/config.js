import dotenv from "dotenv";
dotenv.config();

const _config = {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  EXPIRE: process.env.EXPIRE,
  FRONTEND_URL: process.env.FRONTEND_URL,
  COOKIE_SECRET: process.env.COOKIE_SECRET,
  NODE_ENV: process.env.NODE_ENV,
};

const config = Object.freeze(_config);

export default config;
