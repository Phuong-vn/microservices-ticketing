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
  config: Record<string, string>,
) => {
  const { COOKIE_NAME, JWT_KEY } = config;
  if (!COOKIE_NAME || !JWT_KEY) {
    throw new Error('config required');
  }
  cookieName = COOKIE_NAME;
  jwtKey = JWT_KEY;
  return getCurrentUserHandler;
};
