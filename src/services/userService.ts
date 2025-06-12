import { createUser, getUsers } from "@/controllers/userController";
import { Router } from "express";

const router = Router();

router.get("/", getUsers);
router.post("/", createUser);

export default router;
