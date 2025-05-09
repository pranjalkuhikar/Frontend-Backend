import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const authenticate = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.redirect("/api/login");
    }

    try {
      const decoded = jwt.verify(token, config.JWT_SECRET || "secret");
      req.user = decoded;
      next();
    } catch (error) {
      res.clearCookie("token");
      return res.redirect("/api/login");
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).send("Server error");
  }
};
