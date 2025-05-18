import { register, login } from "../services/user.services.js";

export const registerUser = async (req, res) => {
  try {
    if (req.fileUploadError) {
      console.error("File upload error:", req.fileUploadError);
      return res.status(400).json({
        message: req.fileUploadError.message || "File upload error",
      });
    }
    const { username, email, password } = req.body;
    let profilePhoto = "";

    if (req.file && req.file.path) {
      profilePhoto = req.file.path;
    }

    const user = await register({
      username,
      email,
      password,
      profilePhoto,
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error("Registration error:", error.message);
    console.error("Error stack:", error.stack);
    return res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await login({
      email,
      password,
    });
    res.cookie("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "User logged in successfully",
      result,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(401).json({
      message: error.message || "Internal server error",
    });
  }
};

export const auth = async (req, res) => {
  return res.status(200).json({
    message: "Authenticated",
    user: req.user,
  });
};
