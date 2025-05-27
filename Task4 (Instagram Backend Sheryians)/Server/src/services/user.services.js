import User from "../models/users.model.js";

export const registerUser = async ({ username, email, password }) => {
  if (!username || !email || !password) {
    throw new Error("All fields are required");
  }

  const isAlreadyExist = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (isAlreadyExist) {
    throw new Error("User already exists");
  }

  const hashedPassword = await User.hashPassword(password);
  if (!hashedPassword) {
    throw new Error("Error hashing password");
  }

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  await newUser.save();
  delete newUser._doc.password;
  return newUser;
};

export const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("All fields are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  delete user._doc.password;
  return user;
};
