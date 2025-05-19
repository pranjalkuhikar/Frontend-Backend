import config from "../config/config.js";
import { registerService, loginService } from "../services/user.services.js";

export const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let profilePhoto = "";

    if (req.file && req.file.path) {
      profilePhoto = req.file.path;
    }
    const user = await registerService({
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
    res.status(400).json({ message: error.message });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await loginService({ email, password });
    res.cookie("token", user.token, {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(200).json({
      message: "User logged in successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const authController = async (req, res) => {
  return res.status(200).json({
    message: "User authenticated successfully",
    user: req.user,
  });
};
