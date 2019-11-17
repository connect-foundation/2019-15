const jwt = require('jsonwebtoken');

function signJWT(req, options = {}) {
  const myOptions = {
    expiresIn: options.expiresIn ? options.expiresIn : '1h',
    issuer: 'catchMyMind',
    subject: 'userInfo',
  };

  return jwt.sign(
    {
      id: req.user.id,
      displayName: req.user.displayName,
    },
    process.env.JWT_SECRET,
    myOptions,
  );
}

module.exports = signJWT;
