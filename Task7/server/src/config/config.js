import dotenv from "dotenv";
dotenv.config();

const _config = {
  PORT: process.env.PORT || 3000,
  DB_URL: process.env.DB_URL,
  SECRET_KEY: process.env.SECRET_KEY,
  EXPIRE_KEY: process.env.EXPIRE_KEY,
  NODE_ENV: process.env.NODE_ENV || "development",
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};

const config = Object.freeze(_config);
export default config;
