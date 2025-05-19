import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePhoto: {
    type: String,
    default: "",
  },
});

userSchema.statics.hashPassword = async function (password) {
  if (!password) {
    throw new Error("Password is required");
  }
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
userSchema.methods.comparePassword = async function (password, hashPassword) {
  if (!password) {
    throw new Error("Password is required");
  }
  if (!hashPassword) {
    throw new Error("Password is required");
  }
  return await bcrypt.compare(password, hashPassword);
};
userSchema.methods.generateToken = function (user) {
  const token = jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
      profilePhoto: this.profilePhoto,
    },
    config.SECRET_KEY,
    {
      expiresIn: config.EXPIRE_KEY,
    }
  );
  return token;
};
userSchema.statics.verifyToken = async function (token) {
  if (!token) {
    throw new Error("Token is required");
  }
  return jwt.verify(token, config.SECRET_KEY);
};
const User = mongoose.model("User", userSchema);

export default User;
