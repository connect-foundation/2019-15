const express = require('express');

const router = express.Router();
const passport = require('../../util/passport');
const authenticate = require('../../middleware/authenticate');
const signJWT = require('../../util/signJWT');

router.get('/test', authenticate);

router.get(
  '/login',
  passport.authenticate('googleLogin', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  }),
);

router.get(
  '/callback',
  passport.authenticate('googleLogin', {
    successRedirect: 'login_success',
    failureRedirect: 'login_fail',
  }),
);

router.get('/login_success', function(req, res) {
  req.user.token = signJWT(req);
  res.sendStatus(200);
});

router.get('/login_fail', function(req, res) {
  res.sendStatus(401);
});

module.exports = router;
