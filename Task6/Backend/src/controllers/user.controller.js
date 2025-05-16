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
    const user = await login({
      email,
      password,
    });
    res.status(200).json({
      message: "User logged in successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
};
