import { validationResult } from "express-validator";
import * as userService from "../services/user.services.js";
import config from "../config/config.js";
import redis from "../services/redis.services.js";

export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { username, email, password } = req.body;
    const user = await userService.registerUser({ username, email, password });
    const token = await user.generateToken();
    res.status(201).json({
      user,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;
    const user = await userService.loginUser({ email, password });
    const token = user.generateToken();
    res.cookie("token", token, {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      user,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    const timeRemainingForToken = req.tokenData.exp * 1000 - Date.now();

    // If token is already expired, no need to blacklist
    if (timeRemainingForToken <= 0) {
      return res.status(200).json({
        message: "Token already expired",
      });
    }

    // Blacklist the token in Redis
    await redis.set(
      `blacklist:${req.tokenData.token}`,
      "true",
      "EX",
      Math.floor(timeRemainingForToken / 1000)
    );

    // Clear the cookie
    res.clearCookie("token");

    return res.status(200).json({
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      message: "Error during logout",
      error: error.message,
    });
  }
};
