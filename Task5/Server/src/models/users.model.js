import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "../config/config.js";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    minlength: [3, "Username must be at least 3 characters long"],
    maxlength: [30, "Username cannot exceed 30 characters"],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },
  profileImage: {
    type: String,
    default: "/public/images/default-profile-image.png",
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.statics.hashPassword = async function (password) {
  if (!password) {
    throw new Error("Password is required");
  }
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

userSchema.methods.comparePassword = async function (password) {
  if (!password) {
    throw new Error("Password is required");
  }
  if (!this.password) {
    throw new Error("Password is not set");
  }
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
    },
    config.JWT_SECRET,
    { expiresIn: config.JWT_EXPIRATION }
  );
};

userSchema.statics.verifyToken = function (token) {
  if (!token) {
    throw new Error("Token is required");
  }
  return jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
    if (err) {
      return null;
    }
    return decoded;
  });
};

const User = mongoose.model("User", userSchema);

export default User;
