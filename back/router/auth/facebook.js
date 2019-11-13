const express = require('express');

const router = express.Router();
const passport = require('../../config/passport');
const authenticate = require('../../middleware/authenticate');

router.get('/test', authenticate);

router.get('/login', passport.authenticate('facebookLogin'));

router.get(
  '/callback',
  passport.authenticate('facebookLogin', {
    successRedirect: 'login_success',
    failureRedirect: 'login_fail',
  }),
);

router.get('/login_success', function(req, res) {
  res.sendStatus(200);
});

router.get('/login_fail', function(req, res) {
  res.sendStatus(401);
});

module.exports = router;
