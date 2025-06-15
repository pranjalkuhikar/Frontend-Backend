import { Router, Request, Response } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { User, IUser } from "../models/user.model.js";
import { redisService } from "../services/redis.service.js";
import { logger } from "../utils/logger.js";

interface AuthRequest extends Request {
  user?: IUser;
}

const router = Router();

/**
 * @swagger
 * /api/v1/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.get("/", authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const cacheKey = `profile:${userId}`;

    // Try to get from cache first
    const cachedProfile = await redisService.get(cacheKey);
    if (cachedProfile) {
      return res.json(JSON.parse(cachedProfile));
    }

    // If not in cache, get from database
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Cache the profile for 1 hour
    await redisService.set(cacheKey, JSON.stringify(user), 3600);

    res.json(user);
  } catch (error) {
    logger.error("Error fetching profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * @swagger
 * /api/v1/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.put("/", authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { username, email } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields
    if (username) user.username = username;
    if (email) user.email = email;

    await user.save();

    // Invalidate cache
    await redisService.del(`profile:${userId}`);

    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    logger.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
