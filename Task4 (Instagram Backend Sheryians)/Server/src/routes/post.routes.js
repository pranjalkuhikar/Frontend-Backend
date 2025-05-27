import { Router } from "express";
import * as postController from "../controllers/post.controllers.js";
import * as postMiddleware from "../middlewares/post.middleware.js";

const router = Router();

router.post(
  "/create",
  postMiddleware.handleFileUpload,
  postController.createPost
);

export default router;
