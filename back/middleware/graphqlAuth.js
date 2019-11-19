const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  console.log(req.cookies);
  if (!req.cookies.jwt) res.status(401).send(false);
  else {
    try {
      const user = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET, {
        issuer: 'catchMyMind',
        subject: 'userInfo',
      });
      req.user = user;
      console.log(user);
      next();
    } catch (e) {
      if (e.name === 'TokenExpiredError') res.status(401).send(false);
      else res.status(403).send(false);
    }
  }
};
