import { GoogleGenAI } from "@google/genai";
import config from "../config/config.js";

// Create the API client
const genAI = new GoogleGenAI({ apiKey: config.GEMINI_API_KEY });

export const generateContent = async (prompt) => {
  try {
    const response = await genAI.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
      generationConfig: {
        temperature: 0.5,
        maxOutputTokens: 100,
      }
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
    const base64Image = imageBuffer.toString('base64');
    
    const response = await genAI.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                data: base64Image,
                mimeType: "image/jpeg"
              }
            },
            {
              text: "Generate a caption for this image"
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 100,
      }
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
