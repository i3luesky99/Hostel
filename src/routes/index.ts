import express from "express";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { checkRole } from "@/middlewares/checkRole.middleware";
import userService from "@/services/userService";
import authService from "@/services/authService";
import houseBlockService from "@/services/houseBlockService";
import { USER_ROLES } from "@/models/User/User";

const router = express.Router();

router.use("/auth", authService);
router.use("/user", [authMiddleware, checkRole([USER_ROLES.ADMIN])], userService);
router.use("/house-block", houseBlockService);


export default router;
