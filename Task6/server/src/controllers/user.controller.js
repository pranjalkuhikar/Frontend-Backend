export const registerUser = (req, res) => {
  res.status(201).json({ message: "User registered successfully" });
};

export const loginUser = (req, res) => {
  res.status(200).json({ message: "Login User" });
};
