import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import xss from "xss-clean";
import indexRouter from "./routes/index.route.js";
import config from "./config/config.js";

const app = express();

// Set security headers first
app.use(helmet());

// Parse cookies early to make them available
app.use(cookieParser(config.COOKIE_SECRET));

// Parse JSON payloads
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Security middleware stack
/* 
  FOR POSTMAN TESTING: Comment these out
  FOR REACT FRONTEND: Uncomment these
*/
// 1. MongoDB query sanitization
app.use(mongoSanitize());

// 2. XSS protection
app.use(xss());

// 3. HTTP Parameter Pollution protection
app.use(hpp());

// 4. Request timeout protection - 1 minute
app.use((req, res, next) => {
  req.setTimeout(60000, () => {
    res.status(408).json({
      status: "error",
      message: "Request timeout",
    });
  });
  next();
});

// 6. CORS configuration
app.use(
  cors({
    origin: "*", // For Postman testing
    // origin: config.FRONTEND_URL || "http://localhost:5173", // For React frontend
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "CSRF-Token"],
  })
);

// Rate limiting
const limiter = rateLimit({
  max: config.NODE_ENV === "production" ? 100 : 1000,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour",
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to all routes
app.use("/api", limiter);

// Logging
app.use(morgan(config.NODE_ENV === "development" ? "dev" : "combined"));

// Debug middleware (only in development)
if (config.NODE_ENV === "development") {
  app.use((req, res, next) => {
    // console.log(`[DEBUG] ${req.method} ${req.path}`);
    // console.log("Request Body:", req.body);
    next();
  });
}

// Routes
app.use("/api", indexRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Resource not found",
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error("Error details:", {
    message: err.message,
    stack: config.NODE_ENV === "development" ? err.stack : undefined,
    path: req.path,
    method: req.method,
  });
  // Handle specific types of errors
  if (err.name === "ValidationError") {
    return res.status(400).json({
      status: "error",
      message: err.message,
    });
  }

  if (err.name === "UnauthorizedError") {
    return res.status(401).json({
      status: "error",
      message: "Invalid token",
    });
  }

  // Handle MongoDB errors
  if (err.name === "MongoError" || err.name === "MongoServerError") {
    if (err.code === 11000) {
      return res.status(409).json({
        status: "error",
        message: "Duplicate key error",
      });
    }
  }

  // Handle timeout errors
  if (err.timeout) {
    return res.status(408).json({
      status: "error",
      message: "Request timeout",
    });
  }

  // Default error
  res.status(err.status || 500).json({
    status: "error",
    message:
      config.NODE_ENV === "development" ? err.message : "Internal server error",
  });
});

export default app;
