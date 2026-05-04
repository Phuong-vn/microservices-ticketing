import express from 'express';
import { verifyUserHandler } from '../middleware/verify-user-handler.ts';
import { currentUserHandler } from '../middleware/current-user-handler.ts';

const router = express.Router();

router.get(
  '/api/users/currentuser',
  verifyUserHandler,
  currentUserHandler,
  (req, res) => {
    return res.status(200).send(req.currentUser);
  },
);

export { router as currentUserRouter };
