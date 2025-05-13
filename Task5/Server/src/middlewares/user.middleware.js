import { body } from "express-validator";
import redis from "../services/redis.services.js";
import User from "../models/users.model.js";

export const registerValidation = [
  body("username")
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can only contain letters, numbers, and underscores")
    .trim(),
  body("email").isEmail().withMessage("Email is not valid").normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[@$!%*?&#]/)
    .withMessage("Password must contain at least one special character"),
];

export const loginValidation = [
  body("email").isEmail().withMessage("Email is not valid").normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
];

export const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const blacklisted = await redis.get(`blacklist:${token}`);
    if (blacklisted)
      return res.status(401).json({ message: "Token blacklisted" });

    const decoded = User.verifyToken(token);
    if (!decoded) return res.status(401).json({ message: "Invalid token" });

    const userId = decoded._id;

    let user = await redis.get(`user:${userId}`);
    if (user) {
      user = JSON.parse(user);
    } else {
      user = await User.findById(userId);
      if (!user) return res.status(401).json({ message: "User not found" });
      if (user) {
        delete user._doc.password;
        await redis.set(`user:${userId}`, JSON.stringify(user));
      }
    }

    req.user = user;
    req.tokenData = { token, ...decoded };
    return next();
  } catch (error) {
    console.error("Auth error:", error);
    res
      .status(401)
      .json({ message: "Authentication failed", error: error.message });
  }
};
