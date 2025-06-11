import UserModel from "../models/user.model.js";

export const registerService = async ({ username, email, password }) => {
  try {
    const existingUser = await UserModel.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      throw new Error(
        existingUser.email === email
          ? "Email already registered"
          : "Username already taken"
      );
    }

    const hashedPassword = await UserModel.hashPassword(password);
    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });

    //  Convert to plain object before removing password
    const userResponse = newUser.toObject();  
    delete userResponse.password;

    return userResponse;
  } catch (error) {
    throw new Error(error.message || "Error during registration");
  }
};

export const loginService = async ({ email, password }) => {
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = await user.generateToken();

    // Convert to plain object before removing password
    const userObject = user.toObject();
    delete userObject.password;

    return {
      user: userObject,
      token,
    };
  } catch (error) {
    throw new Error("Authentication failed");
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("XSRF-TOKEN");
    res.clearCookie("connect.sid");
    res.status(200).json({
      status: "success",
      message: "Logout successful",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
