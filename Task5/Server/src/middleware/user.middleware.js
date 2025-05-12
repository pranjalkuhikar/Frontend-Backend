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
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const isTokenBlacklisted = await redis.get(`blacklist:${token}`);
    if (isTokenBlacklisted) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const decoded = User.verify(token);

    let user = await redis.get(`user:${decoded.id}`);

    if (!user) {
      user = await User.findById(decoded.id);
      if (user) {
        delete user._doc.password;
        await redis.set(`user:${decoded.id}`, JSON.stringify(user));
      } else {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }
    } else {
      user = JSON.parse(user);
    }
    req.user = user;
    req.tokenData = { token, ...decoded };
    return next();
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
