import { generateCaptionFromImageBuffer } from "../services/ai.services.js";

export const createPost = async (req, res, next) => {
  const imageBuffer = req.file.buffer;
  const caption = await generateCaptionFromImageBuffer(imageBuffer);
  res.status(200).json({
    message: "Post created successfully",
    data: {
      caption,
      image: req.file.filename,
    },
  });
};
