import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

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

userSchema.statics.hashPassword = async (password) => {
  if (!password) {
    throw new Error("Password is required");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

userSchema.methods.comparePassword = async function (password) {
  if (!password) {
    throw new Error("Password is required");
  }
  if (!this.password) {
    throw new Error("Password is required");
  }
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

userSchema.methods.generateToken = async function () {
  const token = jwt.sign({ id: this._id }, config.JWT_SECRET, {
    expiresIn: config.EXPIRE,
  });
  return token;
};

userSchema.statics.verifyToken = async (token) => {
  if (!token) {
    throw new Error("Token is required");
  }
  const decoded = jwt.verify(token, config.JWT_SECRET);
  return decoded;
};

const UserModel = mongoose.model("UserModel", userSchema);

export default UserModel;
