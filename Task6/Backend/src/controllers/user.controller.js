export const registerUser = async (req, res) => {
  res.status(200).json({
    message: "User registered",
  });
};

export const loginUser = async (req, res) => {
  res.status(200).json({
    message: "User logged in",
  });
};
