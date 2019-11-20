const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  if (!req.cookies.jwt) res.status(401).send(false);
  else {
    try {
      const user = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET, {
        issuer: 'catchMyMind',
        subject: 'userInfo',
      });
      req.user = user;
      next();
    } catch (e) {
      if (e.name === 'TokenExpiredError') res.status(401).send(false);
      else res.status(403).send(false);
    }
  }
};
