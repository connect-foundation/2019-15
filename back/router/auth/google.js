const express = require('express');

const router = express.Router();
const passport = require('../../util/passport');
const signJWT = require('../../util/signJWT');
const { REACT_URI, EXPRESS_URI } = require('../../config/uri');
const expiresIn = require('../../util/getMsOfDay');
const getDomain = require('../../util/getDomain');

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

router.get('/login_success', async function(req, res) {
  res.cookie('jwt', await signJWT(req), {
    expires: new Date(Date.now() + expiresIn),
    domain: getDomain(REACT_URI),
  });
  res.cookie('nickname', req.user.nickname, {
    expires: new Date(Date.now() + expiresIn),
    domain: getDomain(REACT_URI),
  });
  res.redirect(`${REACT_URI}/main`);
});

router.get('/login_fail', function(req, res) {
  res.redirect(`${REACT_URI}`);
});

module.exports = router;
