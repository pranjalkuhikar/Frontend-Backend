import express from "express";
const router = express.Router();

import {
  registerUser,
  loginUser,
  auth,
} from "../controllers/user.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../config/cloudinary.config.js";

// Multer + Cloudinary error handler middleware
const handleMulterError = (err, _req, res, _next) => {
  if (err?.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({
      message: "File is too large. Maximum size is 5MB.",
    });
  }

  if (err?.message === "Only image files are allowed!") {
    return res.status(415).json({
      message: err.message,
    });
  }

  if (err?.message?.includes("Invalid Signature")) {
    console.error("Cloudinary authentication error:", err);
    return res.status(500).json({
      message: "Cloud storage authentication error. Please contact the admin.",
    });
  }

  if (err?.message?.includes("Request Timeout")) {
    console.error("Cloudinary timeout error:", err);
    return res.status(500).json({
      message: "Cloud storage timeout. Please try again later.",
    });
  }

  console.error("File upload error:", err);
  return res.status(500).json({
    message: "Error uploading file to cloud storage.",
  });
};

// 📌 Register route (with file upload)
router.post(
  "/register",
  (req, res, next) => {
    upload.single("profilePhoto")(req, res, (err) => {
      if (err) {
        console.error("File upload error (continuing with registration):", err);
        req.fileUploadError = err; // Pass error to controller if needed
      } else {
        console.log("File upload successful:", req.file);
      }
      next(); // Continue with registerUser
    });
  },
  registerUser,
  handleMulterError
);

// 📌 Login
router.post("/login", loginUser);

// 📌 Auth check
router.get("/auth", authMiddleware, auth);


export default router;
