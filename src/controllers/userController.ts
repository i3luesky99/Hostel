import { User } from "@/models/User/User";
import { Request, Response } from "express";

export const getUsers = async (_: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    if (error.name === "SequelizeValidationError") {
      res.status(400).json({ message: error.errors[0].message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user", error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      await user.update(req.body);
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to update user", error });
  }
};
