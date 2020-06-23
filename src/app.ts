import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import { join } from 'path';
import morgaan from 'morgan';
import session from 'express-session';
import passport from 'passport';
import router from './routers/indexRouter';
import connectDB from './config/db';
import configurePassport from './config/passport';

const CONFIG_PATH = './config/config.env';
// const MongoStore = mongo(session);

function setupConfig() {
  // Load config
  dotenv.config({ path: CONFIG_PATH });
}

function setupDB() {
  connectDB();
}

function setupExpress(): Application {
  return express();
}

// Enable logging
function setupLogger(app: Application) {
  if (process.env.NODE_ENV !== 'dev') return;
  app.use(morgaan('dev'));
}

function setupStaticFolder(app: Application) {
  app.use(express.static(join(__dirname, '..', 'public')));
}

function setupBodyParser(app: Application) {
  app.use(express.urlencoded({ extended: false }));
}

function setupSession(app: Application) {
  const sessionConfig = {
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
  };

  app.use(session(sessionConfig));
}

function setupPassport(app: Application) {
  app.use(passport.initialize());
  app.use(passport.session());
  configurePassport(passport);
}

function setupApp(): Application {
  setupConfig();
  setupDB();
  const app = setupExpress();
  setupLogger(app);
  setupStaticFolder(app);
  setupBodyParser(app);
  setupSession(app);
  setupPassport(app);
  return app;
}

function startExpress(app: Application) {
  const { PORT } = process.env;
  app.use(router);

  // Start server
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Listening on port ${PORT} in ${process.env.NODE_ENV}`);
  });
}

const app = setupApp();
startExpress(app);
