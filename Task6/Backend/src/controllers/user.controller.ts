import { Request, Response } from "express";
import { register, login, verifyEmail as verifyEmailService } from "../services/user.services.js";
import { IUser } from "../models/user.model.js";

interface RegisterUserBody {
  username: string;
  email: string;
  password: string;
  profilePhoto?: string;
}

interface LoginUserBody {
  email: string;
  password: string;
}

interface AuthRequest extends Request {
  user?: IUser;
}

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, email, password } = req.body as RegisterUserBody;
    let profilePhoto = "";

    if (req.file) {
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
    res.status(500).json({
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body as LoginUserBody;

  try {
    const result = await login({
      email,
      password,
    });
    console.log(process.env.NODE_ENV);
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
    console.error(
      "Login error:",
      error instanceof Error ? error.message : "Unknown error"
    );
    res.status(401).json({
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
};

export const auth = async (req: AuthRequest, res: Response): Promise<void> => {
  res.status(200).json({
    message: "Authenticated",
    user: req.user,
  });
};

export const verifyEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.query;
    if (!token || typeof token !== "string") {
      res.status(400).json({ message: "Verification token is required" });
      return;
    }

    await verifyEmailService(token);
    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : "Invalid verification token",
    });
  }
};
