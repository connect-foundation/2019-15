const express = require('express');

const router = express.Router();
const passport = require('../../util/passport');
const signJWT = require('../../util/signJWT');

router.get('/login', passport.authenticate('facebookLogin'));

router.get(
  '/callback',
  passport.authenticate('facebookLogin', {
    successRedirect: 'login_success',
    failureRedirect: 'login_fail',
  }),
);

router.get('/login_success', function(req, res) {
  res.cookie('jwt', signJWT(req));
  res.redirect(`${process.env.REACT_APP_URI}/main`);
});

router.get('/login_fail', function(req, res) {
  res.redirect(`${process.env.REACT_APP_URI}`);
});

module.exports = router;
