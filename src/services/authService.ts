import { login, } from "@/controllers/authController";
import { Router } from "express";

const router = Router();

router.post("/login", login);
// router.post("/refresh-token", refreshToken);
// router.post("/logout", logout);

export default router;
