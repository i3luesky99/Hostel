import { createUser, getUsers, getUserById, updateUser } from "@/controllers/userController";
import { Router } from "express";

const router = Router();

router.get("/", getUsers);
router.post("/", createUser);
router.get("/:id", getUserById);
router.post("/:id", updateUser);

export default router;
