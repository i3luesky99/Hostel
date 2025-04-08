import express from "express";
import { User } from "../models/user";

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.post("/", async (req, res) => {
  const user = await User.create({ name: req.body.name });
  res.json(user);
});

export default router;
