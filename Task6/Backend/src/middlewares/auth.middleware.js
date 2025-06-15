import userModel from "../models/user.model.js";

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const data = userModel.verifyAuthToken(token);
    req.user = data;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default authMiddleware;
