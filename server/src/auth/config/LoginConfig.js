'use strict';

import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { UserModel } from '../model/UserModel.js';
import expressSession from 'express-session';
import RedisStoreFactory from 'connect-redis';
import { app } from '../../core/view/Express.js';

export const loginConfig = {
    configurePassportSettings() {
        console.log('configured passport');

        var RedisStore = RedisStoreFactory(expressSession);

        app.use(expressSession({
            store: new RedisStore({
                host: '127.0.0.1',
                port: 6379
            }), secret: 'hey you'
        }));

        app.use(passport.initialize());
        app.use(passport.session());

        passport.use('local', new LocalStrategy(UserModel.authenticate()));
        passport.serializeUser(UserModel.serializeUser());
        passport.deserializeUser(UserModel.deserializeUser());
   }, configureRoutes() {
        app.post('/login', passport.authenticate('local'), (req, res) => {
            console.log('logged in');
            res.status(200).send('logged in');
        });
        app.post('/register', (req, res) => {
            UserModel.register(new UserModel({username: req.body.username}), req.body.password, (err, account) => {
                if (err) {
                    return res.status(401).send(err);
                }
                passport.authenticate('local')(req, res, function () {
                    res.redirect('/');
                });
            });
        });
    }, configure() {
        this.configurePassportSettings();
        this.configureRoutes();
    }
};