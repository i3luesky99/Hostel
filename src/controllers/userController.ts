import { User } from "@/models/User/User";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { BCRYPT_SALT_ROUNDS } from "@/config";

export const getUsers = async (_: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error });
  }
};

export const createUser = async (req: Request, res: Response): Promise<any> => {
  try {

    const { username, password, ...rest } = req.body;

    const existingUser = await User.findOne({
      where: { username: req.body.username },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashPassword = await bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS);

    const user = await User.create({
      username,
      password: hashPassword,
      ...rest,
    });

    return res.status(201).json(user);
  } catch (error: any) {
    if (error.name === "SequelizeValidationError") {
      res.status(400).json({ message: error.errors[0].message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user", error });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {

      const { username, password } = req.body;

      if (password) {
        req.body.password = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
      }
      const existingUserName = await User.findOne({
        where: { username: username },
      });

      if (existingUserName) {
        return res.status(400).json({ message: "Username already exists" });
      }
      await user.update(req.body);
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to update user", error });
  }
};
