import { UserRole } from '@/models/User/User';
import { Request, Response, NextFunction } from 'express';

export const checkRole = (roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const userRole = req.user.role;
    if (!roles.includes(userRole)) {
      res.status(403).json({
        message: 'Access denied. You do not have permission to access this resource.'
      });
      return;
    }

    next();
  };
};