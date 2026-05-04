import type { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../errors/index.ts';

interface CurrentUser {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: CurrentUser;
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
  req.currentUser = {
    id: 'id',
    email: 'email',
  };
  next();
};
