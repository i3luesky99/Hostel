import { User } from "@/models/User/User";
import { Request, Response } from "express";

export const getUsers = async (_: Request, res: Response) => {
  const users = await User.findAll();
  res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const user = await User.create(req.body);
  res.json(user);
};
