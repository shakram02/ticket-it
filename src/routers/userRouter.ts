import express from 'express';
import passport from 'passport';
import { postRegisterUser } from '../controllers/userController';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('USER ROUTER HERE!');
});

router.get('/me', (req, res) => {
  res.send('Welcome user.');
});

router.post('/register', postRegisterUser);

router.post('/login', passport.authenticate('local',
  { successRedirect: '/', failureRedirect: '/users/login' }));
export default router;
