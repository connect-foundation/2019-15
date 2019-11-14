const jwt = require('jsonwebtoken');

function signJWT(req) {
  return jwt.sign(
    {
      id: req.user.id,
      displayName: req.user.displayName,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1h',
      issuer: 'catchMyMind',
      subject: 'userInfo',
    },
  );
}

module.exports = signJWT;
