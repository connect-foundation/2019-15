const express = require('express');

const router = express.Router();
const passport = require('../../config/passport');
const authenticate = require('../../middleware/authenticate');

router.get('/test', authenticate);

router.get('/login', passport.authenticate('googleLogin', { scope: 'email' }));

router.get(
  '/callback',
  passport.authenticate('googleLogin', {
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
