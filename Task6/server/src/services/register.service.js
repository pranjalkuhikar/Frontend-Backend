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

    // Remove password from response
    const userResponse = newUser.toObject();
    delete userResponse.password;

    return userResponse;
  } catch (error) {
    throw new Error(error.message || "Error during registration");
  }
};

export const loginService = async ({ email, password }) => {
  try {
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await UserModel.comparePassword(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = await user.generateToken();

    // Remove sensitive data before sending response
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
    };
  } catch (error) {
    throw new Error("Authentication failed");
  }
};
