import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface CurrentUser {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: CurrentUser | null;
      session?: Record<string, string> | null;
    }
  }
}

let cookieName = '';
let jwtKey = '';

const getCurrentUserHandler = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const token = req.session?.[cookieName];
  if (!token) {
    req.currentUser = null;
    return next();
  }
  try {
    const verifiedUser = jwt.verify(token, jwtKey) as CurrentUser;
    req.currentUser = verifiedUser;
  } catch (error) {
    req.currentUser = null;
  }
  next();
};

export const useCurrentUserHandler = (
  config: {
    cookieName: string,
    jwtKey: string,
  },
) => {
  if (!config.cookieName || !config.jwtKey) {
    throw new Error('config required');
  }
  cookieName = config.cookieName;
  jwtKey = config.jwtKey;
  return getCurrentUserHandler;
};
