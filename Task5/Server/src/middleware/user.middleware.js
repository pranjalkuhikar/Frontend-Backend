import { body } from "express-validator";
import redis from "../services/redis.services.js";

export const registerValidation = [
  // Validate username
  body("username")
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can only contain letters, numbers, and underscores")
    .trim(),

  // Validate email
  body("email").isEmail().withMessage("Email is not valid").normalizeEmail(),

  // Validate password
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

// Validate login
export const loginValidation = [
  // Validate email
  body("email").isEmail().withMessage("Email is not valid").normalizeEmail(),

  // Validate password
  body("password").notEmpty().withMessage("Password is required"),
];
