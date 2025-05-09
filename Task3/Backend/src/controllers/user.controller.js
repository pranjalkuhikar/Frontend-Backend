import User from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).send("Please fill all the fields");
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send("Please provide a valid email address");
    }

    // Password strength validation
    if (password.length < 6) {
      return res
        .status(400)
        .send("Password must be at least 6 characters long");
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send("User already exists");
    }

    // Create new user
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    return res.status(201).send("User registered successfully");
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).send("Server error during registration");
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).send("Please fill all the fields");
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(404).send("User does not exist");
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, userExists.password);
    if (!isPasswordValid) {
      return res.status(401).send("Invalid password");
    }

    // Create and set token
    const token = jwt.sign(
      { id: userExists._id },
      config.JWT_SECRET || "secret",
      {
        expiresIn: "1h",
      }
    );
    res.cookie("token", token, { httpOnly: true });

    return res.status(200).send("Login successful");
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).send("Server error during login");
  }
};

export const logoutController = (req, res) => {
  res.clearCookie("token");
  return res.status(200).send("Logout successful");
};

export const authenticateController = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({
        authenticated: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      authenticated: true,
      user: user,
    });
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({
      authenticated: false,
      message: "Server error during authentication check",
    });
  }
};

let data = [
  {
    id: 1,
    profilePic: "https://i.pravatar.cc/150?img=1",
    profileName: "john_doe",
    feedImage: "https://picsum.photos/600/400?random=1",
    caption: "Exploring the beauty of nature 🌿",
    likes: 120,
    comments: 15,
  },
  {
    id: 2,
    profilePic: "https://i.pravatar.cc/150?img=2",
    profileName: "jane_smith",
    feedImage: "https://picsum.photos/600/400?random=2",
    caption: "City vibes 🏙️",
    likes: 200,
    comments: 30,
  },
  {
    id: 3,
    profilePic: "https://i.pravatar.cc/150?img=3",
    profileName: "travel_guru",
    feedImage: "https://picsum.photos/600/400?random=3",
    caption: "Wanderlust at its peak ✈️",
    likes: 340,
    comments: 45,
  },
  {
    id: 4,
    profilePic: "https://i.pravatar.cc/150?img=4",
    profileName: "foodie_life",
    feedImage: "https://picsum.photos/600/400?random=4",
    caption: "Delicious treats 🍩",
    likes: 150,
    comments: 20,
  },
  {
    id: 5,
    profilePic: "https://i.pravatar.cc/150?img=5",
    profileName: "fitness_freak",
    feedImage: "https://picsum.photos/600/400?random=5",
    caption: "Stay strong, stay healthy 💪",
    likes: 250,
    comments: 35,
  },
];

export const feedController = async (req, res) => {
  try {
    return res.status(200).json(data);
  } catch (error) {
    console.error("Feed controller error:", error);
    return res.status(500).send("Server error");
  }
};
