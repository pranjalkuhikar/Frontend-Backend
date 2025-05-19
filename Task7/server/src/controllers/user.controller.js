import config from "../config/config.js";
import { registerService } from "../services/user.services.js";

export const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let profilePhoto = req.file ? req.file.path : "";
    const user = await registerService({
      username,
      email,
      password,
      profilePhoto,
    });
    res.status(201).json(user);
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
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
