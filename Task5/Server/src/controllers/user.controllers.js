import { validationResult } from "express-validator";
import * as userService from "../services/user.services.js";

export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { username, email, password } = req.body;
    const user = await userService.registerUser({ username, email, password });
    const token = await user.generateToken();
    res.status(201).json({
      user,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;
    const user = await userService.loginUser({ email, password });
    const token = await user.generateToken();
    res.status(200).json({
      user,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
