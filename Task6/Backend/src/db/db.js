import mongoose from "mongoose";
import config from "../config/config.js";

const connectDB = async () => {
  try {
    await mongoose
      .connect(config.MONGO_URI)
      .then(() => console.log("MongoDB connected"))
      .catch((err) => console.log("MongoDB connection error: ", err));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
