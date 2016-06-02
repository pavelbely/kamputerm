import { Router } from 'express';
import { UserModel } from 'auth/model/UserModel';
import passport from 'passport';

const router = Router();

router.post('/login', passport.authenticate('local'), (req, res) => {
    console.log('logged in');
    res.status(200).send('logged in');
});

router.post('/register', (req, res) => {
    UserModel.register(new UserModel({username: req.body.username}), req.body.password, (err, account) => {
        if (err) {
            return res.status(401).send(err);
        }
        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

export default router;