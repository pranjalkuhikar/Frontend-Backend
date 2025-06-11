import {
  loginService,
  logoutService,
  registerService,
} from "../services/user.service.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await registerService({ username, email, password });
    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginService({ email, password });
    res.status(200).json({
      status: "success",
      message: "Login successful",
      data: { user, token },
    });
  } catch (error) {
    res.status(401).json({
      status: "error",
      message: error.message,
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    await logoutService(req, res);
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
