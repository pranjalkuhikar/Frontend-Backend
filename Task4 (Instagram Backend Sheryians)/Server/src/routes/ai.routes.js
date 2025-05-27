import { Router } from "express";
import { generateContent } from "../services/ai.services.js";

const router = Router();

router.get("/", async (req, res) => {
  const prompt = req.query.prompt;
  const response = await generateContent(prompt);
  res.status(200).json({
    message: "AI response",
    data: response,
  });
});

export default router;
