import express from 'express';
import { getCurrentUserHandler } from '@doffy-gittix/common';

const router = express.Router();

router.get('/api/users/currentuser', getCurrentUserHandler, (req, res) => {
  return res.send({ currentUser: req.currentUser });
});

export { router as currentUserRouter };
