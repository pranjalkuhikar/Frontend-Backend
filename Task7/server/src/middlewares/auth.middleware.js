import userModel from "../models/user.model.js";

const middleware = async (req, res, next) => {
  let token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = await userModel.verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default middleware;
