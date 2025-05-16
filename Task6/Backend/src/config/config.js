import dotenv from "dotenv";
dotenv.config();

const _config = {
  PORT: process.env.PORT || 8080,
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/test5",
};

const config = Object.freeze(_config);

export default config;
