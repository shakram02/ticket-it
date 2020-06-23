import { PassportStatic } from 'passport';
import passportLocal from 'passport-local';
import { Document } from 'mongoose';
import { User, IUser, verifyPassword } from '../models/User';

const LocalStrategy = passportLocal.Strategy;

function setupSerializeUser(passport: PassportStatic) {
  passport.serializeUser((user: Document, done) => done(null, user.id));
}

function setupDeserializeUser(passport: PassportStatic) {
  passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)));
}

function setupStrategy(passport: PassportStatic) {
  const strategyConfig = {
    usernameField: 'email',
    passwordField: 'password',
  };

  const verifyFunction = (email: string, password: string, done: Function) => {
    User.findOne({ email }, (err, user: IUser) => {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!verifyPassword(user, password)) { return done(null, false); }
      return done(null, user);
    });
  };
  passport.use(new LocalStrategy(strategyConfig, verifyFunction));
}

export default function setupPassport(passport: PassportStatic) {
  setupSerializeUser(passport);
  setupDeserializeUser(passport);
  setupStrategy(passport);
}
