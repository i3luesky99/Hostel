import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "@/models/User/User";
import { config } from '@/config';

type AccessTokenType = {
  id: number;
  role: string;
}

const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.accessExpiration,
  } as jwt.SignOptions);
};

const generateRefreshToken = (payload: object) => {
  return jwt.sign(payload, config.jwt.refreshSecret, {
    expiresIn: config.jwt.refreshExpiration
  } as jwt.SignOptions);
};

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username }, attributes: { include: ['password'] } });

    if (!user) return res.status(404).json({ message: "User not found" });

    const { dataValues } = user;

    const isMatch = await bcrypt.compare(password, dataValues.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const payload = { id: dataValues.id, role: dataValues.role } as AccessTokenType;
    const access_token = generateAccessToken(payload);
    const refresh_token = generateRefreshToken(payload);

    await user.update({ refresh_token: refresh_token });

    return res.json({ access_token, refresh_token, user: { id: dataValues.id, username: dataValues.username, role: dataValues.role } });

  } catch (err) {
    return res.status(500).json({ message: "Login failed", error: err });
  }
};

export const refreshToken = async (req: Request, res: Response): Promise<any> => {
  const { refresh_token } = req.body;
  if (!refresh_token) return res.status(401).json({ message: "Refresh token missing" });

  try {
    const payload = jwt.verify(refresh_token, config.jwt.refreshSecret) as AccessTokenType;
    const user = await User.findByPk(payload.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { dataValues } = user;

    if (!user || dataValues.refresh_token !== refresh_token) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = generateAccessToken({ id: dataValues.id, role: dataValues.role });
    res.json({ access_token: newAccessToken });
  } catch (err) {
    return res.status(403).json({ message: "Token invalid or expired", error: err });
  }
};

export const logout = async (req: Request, res: Response) => {
  const { refresh_token } = req.body;

  try {
    const payload = jwt.verify(refresh_token, config.jwt.refreshSecret) as AccessTokenType;
    const user = await User.findByPk(payload.id);
    if (user) {
      await user.update({ refresh_token: null });
    }
    res.json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: "Logout failed", error: err });
  }
};
