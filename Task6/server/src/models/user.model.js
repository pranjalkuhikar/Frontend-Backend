import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
const UserModel = mongoose.model("UserModel", userSchema);

export default UserModel;
