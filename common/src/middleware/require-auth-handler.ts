import type { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../errors/index.js';

export const requireAuthHandler = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  if (!req.currentUser) {
    throw new UnauthorizedError();
  }
  next();
};
