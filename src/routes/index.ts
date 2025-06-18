import express from "express";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { checkRole } from "@/middlewares/checkRole.middleware";
import userService from "@/services/userService";
import authService from "@/services/authService";
import { USER_ROLES } from "@/models/User/User";

const router = express.Router();

router.use("/user", [authMiddleware, checkRole([USER_ROLES.ADMIN])], userService);
router.use("/auth", authService);

export default router;
