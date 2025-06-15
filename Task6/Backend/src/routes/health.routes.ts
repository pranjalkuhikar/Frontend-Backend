import { Router, Request, Response } from "express";
import { redisService } from "../services/redis.service.js";
import mongoose from "mongoose";
import { logger } from "../utils/logger.js";

const router = Router();

/**
 * @swagger
 * /api/v1/health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 uptime:
 *                   type: number
 *                 timestamp:
 *                   type: number
 *                 services:
 *                   type: object
 *                   properties:
 *                     redis:
 *                       type: boolean
 *                     database:
 *                       type: boolean
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const health = {
      status: "OK",
      uptime: process.uptime(),
      timestamp: Date.now(),
      services: {
        redis: await redisService.ping(),
        database: mongoose.connection.readyState === 1,
      },
      environment: process.env.NODE_ENV,
      memory: process.memoryUsage(),
    };

    logger.info("Health check completed", { health });
    res.status(200).json(health);
  } catch (error) {
    logger.error("Health check failed", { error });
    res.status(500).json({
      status: "ERROR",
      message: "Health check failed",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default router;
