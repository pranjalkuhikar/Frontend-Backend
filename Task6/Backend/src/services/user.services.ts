import jwt from "jsonwebtoken";
import { User, IUser } from "../models/user.model.js";
import config from "../config/config.js";
import { redisService } from "./redis.service.js";
import { emailService } from "./email.service.js";
import crypto from "crypto";

interface RegisterData {
  username: string;
  email: string;
  password: string;
  profilePhoto?: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const register = async (data: RegisterData): Promise<IUser> => {
  const { username, email, password, profilePhoto } = data;

  // Check if user already exists
  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  // Create new user
  const user = await User.create({
    username,
    email,
    password,
    profilePhoto,
  });

  // Generate verification token
  const verificationToken = crypto.randomBytes(32).toString("hex");
  await redisService.set(`verify:${verificationToken}`, user._id.toString(), 24 * 60 * 60); // 24 hours

  // Send verification email
  await emailService.sendVerificationEmail(email, verificationToken);

  return user;
};

export const login = async (data: LoginData) => {
  const { email, password } = data;

  // Find user
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  // Check password
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  // Generate token
  const token = jwt.sign(
    { id: user._id, username: user.username },
    config.JWT_SECRET!,
    { expiresIn: "1d" }
  );

  // Cache user data
  const userData = {
    id: user._id,
    username: user.username,
    email: user.email,
    profilePhoto: user.profilePhoto,
  };
  await redisService.set(`user:${user._id}`, JSON.stringify(userData), 24 * 60 * 60); // 24 hours

  return {
    user: userData,
    token,
  };
};

export const verifyEmail = async (token: string): Promise<boolean> => {
  const userId = await redisService.get(`verify:${token}`);
  if (!userId) {
    throw new Error("Invalid or expired verification token");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  user.isVerified = true;
  await user.save();
  await redisService.del(`verify:${token}`);

  return true;
};
