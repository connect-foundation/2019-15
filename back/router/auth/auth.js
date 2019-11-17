const express = require('express');
const facebookRouter = require('./facebook');
const googleRouter = require('./google');
const authenticate = require('../../middleware/authenticate');
const signJWT = require('../../util/signJWT');

const router = express.Router();

router.use('/facebook', facebookRouter);
router.use('/google', googleRouter);

router.get('/logout', function(req, res, next) {
  // expiresIn must be string because string is micro seconds but int is seconds
  res.cookie('jwt', signJWT(req, { expiresIn: '0' }));
  res.redirect(`${process.env.REACT_APP_URI}`);
});

router.get('/authenticate', authenticate);

module.exports = router;
