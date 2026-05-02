import type { Request, Response, NextFunction } from 'express';
import { BaseError } from '../errors/index.ts';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof BaseError) {
    return res.status(err.statusCode).send({ errors: err.serialize() });
  }
  return res.status(400).send(err.message);
};
