import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    profilePhoto: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.hashPassword = async (password) => {
  if (!password) {
    throw new Error("Password is required");
  }
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

userSchema.methods.comparePassword = async (password, hashedPassword) => {
  if (!password || !hashedPassword) {
    throw new Error("Password and hashed password are required");
  }
  return await bcrypt.compare(password, hashedPassword);
};

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
      profilePhoto: this.profilePhoto,
    },
    config.JWT_SECRET,
    { expiresIn: config.JWT_EXPIRATION_TIME }
  );
  return token;
};

userSchema.statics.verifyAuthToken = (token) => {
  if (!token) {
    throw new Error("Token is required");
  }
  return jwt.verify(token, config.JWT_SECRET);
};

const userModel = mongoose.model("User", userSchema);

export default userModel;
