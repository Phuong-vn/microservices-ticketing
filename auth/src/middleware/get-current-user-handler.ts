import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { COOKIE_NAME, JWT_KEY } from '../config.ts';

interface CurrentUser {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: CurrentUser | null;
    }
  }
}

export const getCurrentUserHandler = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const token = req.session?.[COOKIE_NAME];
  if (!token) {
    req.currentUser = null;
    return next();
  }
  try {
    const verifiedUser = jwt.verify(token, JWT_KEY!) as CurrentUser;
    req.currentUser = verifiedUser;
  } catch (error) {
    req.currentUser = null;
  }
  next();
};
