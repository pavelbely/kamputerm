'use strict';

import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { UserModel } from 'auth/model/UserModel';
import expressSession from 'express-session';
import RedisStoreFactory from 'connect-redis';

export const loginConfig = {
  configurePassportSettings(app) {
    console.log('configured passport');

    var RedisStore = RedisStoreFactory(expressSession);

    app.use(expressSession({
      store: new RedisStore({
        host: '127.0.0.1',
        port: 6379,
      }), secret: 'hey you',
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use('local', new LocalStrategy(UserModel.authenticate()));
    passport.serializeUser(UserModel.serializeUser());
    passport.deserializeUser(UserModel.deserializeUser());
  }, configureRoutes(app) {

  }, configure(app, config) {
    this.configurePassportSettings(app);
    this.configureRoutes(app);
  },
};
