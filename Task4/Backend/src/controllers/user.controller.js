import bcrypt from "bcrypt";
import upload, { uploadToCloudinary } from "../utils/fileUpload.js";

export const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    if (!username && !email && !phone && !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Upload profile image if exists
    let profileImageUrl = null;
    if (req.files && req.files.profileImage) {
      const result = await uploadToCloudinary(
        req.files.profileImage[0].buffer,
        "profile-images"
      );
      profileImageUrl = result.secure_url;
    }

    // Upload PDF if exists
    let pdfUrl = null;
    if (req.files && req.files.pdfDocument) {
      const result = await uploadToCloudinary(
        req.files.pdfDocument[0].buffer,
        "documents"
      );
      pdfUrl = result.secure_url;
    }

    // Upload multiple images if they exist
    let imageUrls = [];
    if (req.files && req.files.images) {
      for (const file of req.files.images) {
        const result = await uploadToCloudinary(file.buffer, "gallery");
        imageUrls.push(result.secure_url);
      }
    }

    // Here you would save the user to your database
    // const user = await User.create({...})

    res.status(201).json({
      message: "User registered successfully",
      profileImage: profileImageUrl,
      pdfDocument: pdfUrl,
      images: imageUrls,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
};

export const login = (req, res) => {
  res.json({ message: "Login route" });
};
