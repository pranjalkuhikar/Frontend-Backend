import { GoogleGenAI } from "@google/genai";
import config from "../config/config.js";

// Create the API client
const genAI = new GoogleGenAI({ apiKey: config.GEMINI_API_KEY });

// Define the system instruction
const INSTAGRAM_CAPTION_INSTRUCTION = `
You are a very experienced Instagram influencer creating captions for posts.
Your captions are witty, relatable, and designed to get likes and comments.
Use emojis liberally to make your captions stand out.
Write concisely - captions should be under 30 words and easy to read.
Provide ONLY the caption text, nothing else.
`;

export const generateContent = async (prompt) => {
  try {
    // Combine system instruction with user prompt
    const fullPrompt = `${INSTAGRAM_CAPTION_INSTRUCTION}\n\nCreate a caption for: ${prompt}`;

    const response = await genAI.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: fullPrompt }],
        },
      ],
      generationConfig: {
        temperature: 0.5,
        maxOutputTokens: 100,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error generating content:", error);
    throw new Error(`AI generation failed: ${error.message}`);
  }
};

export const generateCaptionFromImageBuffer = async (imageBuffer) => {
  try {
    if (!imageBuffer || !Buffer.isBuffer(imageBuffer)) {
      throw new Error("Invalid image buffer provided");
    }

    // Convert buffer to base64
    const base64Image = imageBuffer.toString("base64");

    const response = await genAI.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                data: base64Image,
                mimeType: "image/jpeg",
              },
            },
            {
              text: `${INSTAGRAM_CAPTION_INSTRUCTION}\n\nGenerate a caption for this image:`,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 100,
      },
    });

    if (!response || !response.text) {
      throw new Error("No response from AI model");
    }

    return response.text;
  } catch (error) {
    console.error("Error generating caption from image:", error);
    throw new Error(`AI generation failed: ${error.message}`);
  }
};
