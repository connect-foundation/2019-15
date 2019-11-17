const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
  if (!req.cookies.jwt) res.status(401).send(false);
  else {
    try {
      jwt.verify(req.cookies.jwt, process.env.JWT_SECRET, {
        issuer: 'catchMyMind',
        subject: 'userInfo',
      });
      res.status(200).send(true);
    } catch (e) {
      if (e.name === 'TokenExpiredError') res.status(401).send(false);
      else res.status(403).send(false);
    }
  }
};
