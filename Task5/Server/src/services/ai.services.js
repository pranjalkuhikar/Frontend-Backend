import { GoogleGenAI } from "@google/genai";
import config from "../config/config.js";

// Create the API client
const genAI = new GoogleGenAI({ apiKey: config.GEMINI_API_KEY });

async function generateContent(prompt) {
  try {
    const response = await genAI.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
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
}

export default generateContent;
