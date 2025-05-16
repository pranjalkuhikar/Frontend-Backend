import userModel from "../models/user.model.js";

export const register = async ({ username, email, password }) => {
  if (!username || !email || !password) {
    throw new Error("All fields are required");
  }
  const alreadyExists = await userModel.findOne({
    $or: [{ email }, { username }],
  });
  if (alreadyExists) {
    throw new Error("User already exists");
  }
  const hashedPassword = await userModel.hashPassword(password);
  const user = new userModel({ username, email, password: hashedPassword });
  await user.save();
  return user;
};

export const login = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("All fields are required");
  }
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new Error("User does not exist");
  }
  const isMatch = await user.comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }
  const token = await user.generateAuthToken();
  return { user, token };
};
