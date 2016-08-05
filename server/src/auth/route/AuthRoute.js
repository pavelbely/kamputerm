import { Router } from 'express';
import { UserModel } from 'auth/model/UserModel';
import passport from 'passport';
import { ensureAuthenticated } from 'auth/middleware/AuthMiddleware';

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

router.get('/isLoggedIn', ensureAuthenticated);

export default router;
