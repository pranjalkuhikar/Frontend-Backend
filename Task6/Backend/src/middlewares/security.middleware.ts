import { Express } from "express";
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

export const configureSecurityMiddleware = (app: Express): void => {
  // Set security HTTP headers
  app.use(helmet());

  // Data sanitization against XSS
  app.use(xss());

  // Data sanitization against NoSQL query injection
  app.use(mongoSanitize());

  // Prevent parameter pollution
  app.use((req, res, next) => {
    // Remove duplicate parameters
    if (req.query) {
      Object.keys(req.query).forEach((key) => {
        if (Array.isArray(req.query[key])) {
          req.query[key] = req.query[key][0];
        }
      });
    }
    next();
  });
};
