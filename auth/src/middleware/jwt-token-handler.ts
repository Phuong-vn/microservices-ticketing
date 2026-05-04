import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../errors/index.ts';
import { JWT_KEY } from '../config.ts';

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

export const jwtTokenHandler = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  if (!req.session?.jwt) {
    throw new UnauthorizedError();
  }
  try {
    const verifiedUser = jwt.verify(req.session.jwt, JWT_KEY!) as CurrentUser;
    req.currentUser = verifiedUser;
  } catch (error) {
    req.currentUser = null;
  }
  next();
};
