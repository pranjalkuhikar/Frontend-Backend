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
