import mongoose from "mongoose";
import config from "../config/config.js";

const connectDB = async () => {
  try {
    await mongoose
      .connect(config.DB_URL)
      .then(() => console.log("MongoDB connected to DB"));
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDB;
