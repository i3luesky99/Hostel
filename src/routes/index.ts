import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { checkRole } from "../middlewares/checkRole.middleware";
import userService from "@/services/userService";
import authService from "@/services/authService";

const router = express.Router();

router.use("/user", [authMiddleware, checkRole(['Admin'])], userService);
router.use("/auth", authService);

export default router;
