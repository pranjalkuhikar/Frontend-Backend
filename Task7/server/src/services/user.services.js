import userModel from "../models/user.model.js";

export const registerService = async ({
  username,
  email,
  password,
  profilePhoto,
}) => {
  if (!username || !email || !password || !profilePhoto) {
    throw new Error("All fields are required");
  }

  const alreadyExists = await userModel.findOne($or[({ username }, { email })]);
  if (!alreadyExists) {
    throw new Error("User already exists");
  }

  const hashedPassword = await userModel.hashPassword(password);
  const user = await userModel.create({
    username,
    email,
    password: hashedPassword,
    profilePhoto,
  });
  return user;
};

export const loginService = async ({ email, password }) => {
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
