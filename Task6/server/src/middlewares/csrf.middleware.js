import csrf from "csurf";
import config from "../config/config.js";

// CSRF protection middleware
const csrfProtection = csrf({
  cookie: {
    secure: config.NODE_ENV === "production",
    sameSite: "strict",
    httpOnly: true,
  },
});

// Middleware to provide CSRF token
export const csrfMiddleware = (req, res, next) => {
  // Skip CSRF for Postman testing
  if (config.DISABLE_CSRF === "true") {
    return next();
  }

  // Apply CSRF protection
  csrfProtection(req, res, (err) => {
    if (err) {
      return res.status(403).json({
        status: "error",
        message: "CSRF token validation failed",
      });
    }
    // Provide the token in both cookie and as JSON response
    res.cookie("XSRF-TOKEN", req.csrfToken(), {
      secure: config.NODE_ENV === "production",
      sameSite: "strict",
      httpOnly: false, // Needs to be accessible by JavaScript
    });
    next();
  });
};
