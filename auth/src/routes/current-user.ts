import express from 'express';
import { currentUserHandler } from '../middleware/current-user-handler.ts'

const router = express.Router();

router.get('/api/users/currentuser', currentUserHandler, (req, res) => {
  return res.send(req.currentUser);
});

export { router as currentUserRouter };
