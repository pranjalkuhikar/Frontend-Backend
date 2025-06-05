import mongoose from "mongoose";
import config from "../config/config.js";

const connectDB = () => {
  mongoose
    .connect(config.MONGO_URL)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));
};

export default connectDB;
