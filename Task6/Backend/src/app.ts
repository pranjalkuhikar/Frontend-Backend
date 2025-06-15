import express, { Express, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import indexRoutes from "./routes/index.routes.js";
import profileRoutes from "./routes/profile.route.js";
import cookieParser from "cookie-parser";
import compression from "compression";
import { configureSecurityMiddleware } from "./middlewares/security.middleware.js";
import { apiLimiter } from "./middlewares/rateLimiter.middleware.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { logger } from "./utils/logger.js";
import { redisService } from "./services/redis.service.js";
import { requestId } from "./middlewares/requestId.middleware.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";
import env from "./config/env.js";

const app: Express = express();

// Initialize Redis
redisService.connect().catch((error) => {
  logger.error("Failed to connect to Redis:", error);
  process.exit(1);
});

// Security middleware
configureSecurityMiddleware(app);

// Request ID middleware
app.use(requestId);

// Body parser
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Cookie parser
app.use(cookieParser());

// CORS
app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
  })
);

// Compression
app.use(compression());


// Logging
app.use(
  morgan("combined", {
    stream: {
      write: (message: string) => logger.info(message.trim()),
    },
  })
);

// API Documentation
app.use("/api-docs", swaggerUi.serve);
app.get("/api-docs", swaggerUi.setup(swaggerSpec, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "Task6 API Documentation"
}));

// Add a route to get the raw swagger spec
app.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// Rate limiting
app.use("/api", apiLimiter);

// Routes
app.use("/", indexRoutes);
app.use("/api/profile", profileRoutes);

// Centralized error handling middleware
app.use(errorHandler);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
  });
});

export default app;
