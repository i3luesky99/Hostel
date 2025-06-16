import express from "express";
import userService from "@/services/userService";

const router = express.Router();

router.use("/user", userService);

export default router;
