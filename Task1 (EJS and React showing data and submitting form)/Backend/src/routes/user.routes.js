import { Router } from "express";
import {
  userController,
  userForm,
  userShow,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/", userController);
router.post("/", userForm);
router.get("/show", userShow);

export default router;
