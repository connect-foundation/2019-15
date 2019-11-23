const jwt = require('jsonwebtoken');
const jwtOptions = require('../config/jwtOptions');

module.exports = (req, res) => {
  if (!req.cookies.jwt) res.status(401).send(false);
  else {
    try {
      jwt.verify(req.cookies.jwt, process.env.JWT_SECRET, {
        issuer: jwtOptions.issuer,
        subject: jwtOptions.subject,
      });
      res.status(200).send(true);
    } catch (e) {
      if (e.name === 'TokenExpiredError') {
        res.clearCookie('jwt');
        res.status(401).send(false);
      } else {
        res.status(403).send(false);
      }
    }
  }
};
