import express from 'express';
import { verifyUserHandler } from '../middleware/verify-user-handler.ts';
import { currentUserHandler } from '../middleware/current-user-handler.ts';

const router = express.Router();

router.get(
  '/api/users/currentuser',
  verifyUserHandler,
  (req, res) => {
    return res.send({ currentUser: req.currentUser });
  },
);

export { router as currentUserRouter };
