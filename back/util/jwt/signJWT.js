const jwt = require('jsonwebtoken');
const jwtOptions = require('../../config/jwtOptions');
const { Users } = require('../../db/models');

const signJWT = async (req, options = {}) => {
  const { id, nickname, avatar } = await Users.findOne({
    where: {
      userId: req.user.id,
    },
  });

  const myOptions = { ...jwtOptions, expiresIn: options.expiresIn || jwtOptions.expiresIn };
  return jwt.sign(
    {
      id,
      nickname,
      userId: req.user.id,
      displayName: req.user.displayName,
      avatar,
    },
    process.env.JWT_SECRET,
    myOptions,
  );
};

module.exports = signJWT;
