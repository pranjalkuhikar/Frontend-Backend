import { register, login } from "../services/user.services.js";

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await register({
      username,
      email,
      password,
    });
    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
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
