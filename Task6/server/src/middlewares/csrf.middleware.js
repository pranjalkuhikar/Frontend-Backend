/**
 * Middleware to provide CSRF token
 */
export const csrfMiddleware = (req, res, next) => {
  // Provide the token in both cookie and as JSON response
  res.cookie("XSRF-TOKEN", req.csrfToken(), {
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    httpOnly: false, // Needs to be accessible by JavaScript
  });
  next();
};
