import express from 'express';

const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
  req.session = {
    jwt: 'test cookie',
  };
  res.send('Hello world!');
});

export { router as currentUserRouter };
