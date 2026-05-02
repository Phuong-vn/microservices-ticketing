import express from 'express';
import type { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError, DatabaseConnectionError } from '../errors/index.ts';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('invalid email type'),
    body('password')
      .isLength({ min: 4, max: 20 })
      .withMessage('password must have 4-20 characters'),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    res.send('new user created');
  },
);

export { router as signupRouter };
