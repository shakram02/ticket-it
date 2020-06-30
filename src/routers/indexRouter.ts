import express from 'express';
import userRotuer from './userRouter';
import eventRouter from './eventRouter';
import { ensureAuthenticated } from '../config/passport';
import { IUser } from '../models/User';

const router = express.Router();

// @desc    Login/Landing
// @route   GET /
router.get('/', (req: express.Request, res: express.Response) => {
  res.sendFile('index.html');
});

// @desc    Dashboard
// @route   GET /dashboard
router.get('/dashboard', ensureAuthenticated, (req: express.Request, res: express.Response) => {
  const user = req.user as IUser;
  res.send(`dashboard of ${user.name}`);
});

router.use('/users', userRotuer);
router.use('/events', ensureAuthenticated, eventRouter);
export default router;
