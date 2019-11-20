const jwt = require('jsonwebtoken');
const { Users } = require('../db/models');

async function signJWT(req, options = {}) {
  const myOptions = {
    expiresIn: options.expiresIn ? options.expiresIn : '1h',
    issuer: 'catchMyMind',
    subject: 'userInfo',
  };

  const { id } = await Users.findOne({
    where: {
      userId: req.user.id,
    },
  });

  return jwt.sign(
    {
      id,
      userId: req.user.id,
      displayName: req.user.displayName,
    },
    process.env.JWT_SECRET,
    myOptions,
  );
}

module.exports = signJWT;
