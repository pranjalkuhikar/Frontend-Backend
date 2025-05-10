import { Router } from "express";
import { register, login } from "../controllers/user.controller.js";
import upload from "../utils/fileUpload.js";

const router = Router();

// Configure multer for multiple file types
const uploadFields = upload.fields([
  { name: "profileImage", maxCount: 1 },
  { name: "pdfDocument", maxCount: 1 },
  { name: "images", maxCount: 5 },
]);

router.post("/register", uploadFields, register);

router.post("/login", login);

router.get("/dashboard", (req, res) => {
  res.json({ message: "Dashboard route" });
});

export default router;
