const express = require('express');
const facebookRouter = require('./facebook');
const googleRouter = require('./google');

const router = express.Router();

router.use('/facebook', facebookRouter);
router.use('/google', googleRouter);

module.exports = router;
