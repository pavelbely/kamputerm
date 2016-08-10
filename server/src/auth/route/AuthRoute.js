import { Router } from 'express';
import passport from 'passport';
import { UserModel } from 'auth/model/UserModel';
import { ensureAuthenticated } from 'auth/middleware/AuthMiddleware';

const router = new Router();

router.post('/login', passport.authenticate('local'), (req, res) => {
  console.log('logged in');
  res.status(200).send('logged in');
});

router.post('/register', (req, res) => {
  const userModel = new UserModel({ username: req.body.username });
  UserModel.register(
    userModel,
    req.body.password,
    (err, account) => {
      if (err) {
        res.status(401).send(err);
      } else {
        passport.authenticate('local')(
          req,
          res,
          () => {
            res.redirect('/');
          }
        );
      }
    }
  );
});

router.get('/isLoggedIn', ensureAuthenticated);

export default router;
