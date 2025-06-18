import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "@/models/User/User";
import { JWT_SECRET, JWT_REFRESH_SECRET } from '@/config';

const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
};

const generateRefreshToken = (payload: object) => {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: "7d" });
};

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username }, attributes: { include: ['password'] } });

    if (!user) return res.status(404).json({ message: "User not found" });

    const { dataValues } = user;

    const isMatch = await bcrypt.compare(password, dataValues.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const payload = { id: dataValues.id, role: dataValues.role };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    await user.update({ refresh_token: refreshToken });

    return res.json({ accessToken, refreshToken, user: { id: dataValues.id, username: dataValues.username, role: dataValues.role } });

  } catch (err) {
    return res.status(500).json({ message: "Login failed", error: err });
  }
};

export const refreshToken = async (req: Request, res: Response): Promise<any> => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ message: "Refresh token missing" });

  try {
    const payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as any;

    const user = await User.findByPk(payload.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { dataValues } = user;

    if (!user || dataValues.refresh_token !== refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = generateAccessToken({ id: dataValues.id, role: dataValues.role });
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(403).json({ message: "Token invalid or expired", error: err });
  }
};

export const logout = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  try {
    const payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as any;
    const user = await User.findByPk(payload.id);
    if (user) {
      await user.update({ refresh_token: null });
    }
    res.json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: "Logout failed", error: err });
  }
};
