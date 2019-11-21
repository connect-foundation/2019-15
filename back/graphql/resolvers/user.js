const jwt = require('jsonwebtoken');
const jwtOptions = require('../../config/jwtOptions');
const { REACT_URI } = require('../../config/uri');
const expiresIn = require('../../util/getMsOfDay');
const getDomain = require('../../util/getDomain');

module.exports = {
  Query: {
    users: (obj, args, { Users }) => {
      return Users.findAll();
    },
    checkNicknameAvailable: async (obj, { nickname }, { Words, req }) => {
      if (req.user.nickname === nickname) return false;
      const wordFound = await Words.findOne({
        where: {
          word: nickname,
        },
      });
      return !wordFound || !wordFound.dataValues.userId;
    },
  },
  Mutation: {
    changeNickname: async (obj, { nickname }, { Users, Words, req, res }) => {
      const wordFound = await Words.findOne({
        where: {
          word: nickname,
        },
      });

      if (wordFound && wordFound.dataValues.userId) throw new Error('duplicated');

      if (!wordFound) {
        await Words.create({ word: nickname, categoryId: null, userId: req.user.id });
      } else if (!wordFound.dataValues.userId) {
        await Words.update(
          {
            userId: req.user.id,
          },
          {
            where: {
              id: wordFound.dataValues.id,
            },
          },
        );
      }

      await Users.update(
        { nickname },
        {
          where: {
            id: req.user.id,
          },
        },
      );

      res.cookie(
        'jwt',
        jwt.sign(
          {
            ...req.user,
            nickname,
          },
          process.env.JWT_SECRET,
        ),
        {
          expires: new Date(Date.now() + expiresIn),
          domain: getDomain(REACT_URI),
        },
      );
      return true;
    },
  },
};
