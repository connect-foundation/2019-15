const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
  if (!req.user || !req.user.token) res.sendStatus(401);

  try {
    jwt.verify(req.user.token, process.env.JWT_SECRET, {
      issuer: 'catchMyMind',
      subject: 'userInfo',
    });
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(403);
  }
};
