import mongoose from "mongoose";
import config from "../config/config.js";

const connectDB = async () => {
  await mongoose
    .connect(config.DB_URL)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => {
      console.log("error", err);
    });
};

export default connectDB;
