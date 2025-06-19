import * as authController from "@/controllers/authController";
import { Router } from "express";

const router = Router();

router.post("/login", authController.login);
router.post("/refresh-token", authController.refreshToken);
router.post("/logout", authController.logout);

export default router;
