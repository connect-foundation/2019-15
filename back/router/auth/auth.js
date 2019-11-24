const express = require('express');
const facebookRouter = require('./facebook');
const googleRouter = require('./google');
const authenticate = require('../../middleware/authenticate');
const signJWT = require('../../util/signJWT');
const { REACT_URI } = require('../../config/uri');
const getCookieOption = require('../../util/getCookieOption');

const router = express.Router();

router.use('/facebook', facebookRouter);
router.use('/google', googleRouter);

router.get('/logout', async function(req, res) {
  // expiresIn must be string because string is micro seconds but int is seconds
  res.cookie('jwt', await signJWT(req, { expiresIn: '0' }), getCookieOption(Date.now()));
  res.redirect(`${REACT_URI}`);
});

router.get('/authenticate', authenticate);

module.exports = router;
