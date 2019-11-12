const express = require('express');

const router = express.Router();
const passport = require('../config/passportFacebook');
const authenticate = require('../middleware/authenticate');

router.get('/facebook/test', authenticate);
router.get('/facebook/login', passport.authenticate('facebookLogin'));
router.get(
  '/facebook/callback',
  passport.authenticate('facebookLogin', {
    successRedirect: 'login_success',
    failureRedirect: 'login_fail',
  }),
);
router.get('/facebook/login_success', function(req, res) {
  console.log('facebook login success');
  res.sendStatus(200);
});

router.get('/facebook/login_fail', function(req, res) {
  console.log('facebook login fail');
  res.sendStatus(401);
});

module.exports = router;
