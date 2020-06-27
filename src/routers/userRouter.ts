import express from 'express';
import passport from 'passport';
import { postRegisterUser, getLogout } from '../controllers/userController';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('USER ROUTER HERE!');
});

router.get('/me', (req, res) => {
  res.send('Welcome user.');
});

router.get('/logout', getLogout);
router.post('/register', postRegisterUser);

router.post('/login', passport.authenticate('local',
  { successRedirect: '/dashboard', failureRedirect: '/users/login' }));
export default router;
