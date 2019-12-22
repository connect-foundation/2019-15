const jwt = require('jsonwebtoken');
const jwtOptions = require('../../config/jwtOptions');
const { Users } = require('../../db/models');

const signJWT = async (req, options = {}) => {
  const tokenPayload = {
    id: null,
    nickname: null,
    userId: null,
    displayName: null,
    avatar: null,
  };

  // passport를 이용하여 로그인 한 경우
  if (req.user) {
    const { id, nickname, avatar } = await Users.findOne({
      where: {
        userId: req.user.id,
      },
    });

    tokenPayload.id = id;
    tokenPayload.nickname = nickname;
    tokenPayload.avatar = avatar;
    tokenPayload.userId = req.user.userId;
    tokenPayload.displayName = req.user.displayName;
  }

  const myOptions = { ...jwtOptions, expiresIn: options.expiresIn || jwtOptions.expiresIn };
  return jwt.sign(tokenPayload, process.env.JWT_SECRET, myOptions);
};

module.exports = signJWT;
