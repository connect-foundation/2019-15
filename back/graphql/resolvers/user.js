const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const { REACT_URI } = require('../../config/uri');
const expiresIn = require('../../util/getMsOfDay');
const getDomain = require('../../util/getDomain');

const { Op } = Sequelize;

const userResolvers = {
  Query: {
    users: (obj, args, { Users }) => {
      return Users.findAll();
    },
    checkNicknameAvailable: async (obj, { nickname }, { Words, req }) => {
      if (req.user.nickname === nickname) return false;
      const wordFound = await userResolvers.Query.getWordByNickname(
        obj,
        { nickname },
        { Words, req },
      );
      return !wordFound || !wordFound.dataValues.userId;
    },
    getWordByNickname: (obj, { nickname }, { Words }) => {
      return Words.findOne({
        where: {
          word: {
            [Op.eq]: nickname,
          },
        },
      });
    },
  },
  Mutation: {
    changeNickname: async (obj, { nickname }, { Users, Words, req, res, sequelize }) => {
      const wordFound = await userResolvers.Query.getWordByNickname(obj, { nickname }, { Words });

      if (wordFound && wordFound.dataValues.userId) throw new Error('duplicated');

      let transaction;
      try {
        transaction = await sequelize.transaction();
        if (!wordFound) {
          await Words.create(
            { word: nickname, categoryId: null, userId: req.user.id },
            { transaction },
          );
        } else if (!wordFound.dataValues.userId) {
          await Words.update(
            {
              userId: req.user.id,
            },
            {
              where: {
                id: wordFound.dataValues.id,
              },
              transaction,
            },
          );
        }

        const [changedRows] = await Users.update(
          { nickname },
          {
            where: {
              id: req.user.id,
            },
            transaction,
          },
        );
        if (!changedRows) throw new Error(`fails updating ${req.user.id} nickname to ${nickname}`);

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
        await transaction.commit();
        return nickname;
      } catch (e) {
        if (transaction) await transaction.rollback();
        throw new Error(e);
      }
    },
    updateUserNicknameById: (obj, { id, nickname }, { Users }) => {
      return Users.update(
        { nickname: nickname },
        {
          where: {
            id: {
              [Op.eq]: id,
            },
          },
        },
      );
    },
    createWord: (obj, { userId, nickname }, { Words }) => {
      return Words.create({
        word: nickname,
        userId: userId,
      });
    },
    updateWordUserIdById: async (obj, { id, nickname }, { Words }) => {
      return Words.update(
        { nickname: nickname },
        {
          where: {
            id: {
              [Op.eq]: id,
            },
          },
        },
      );
    },
  },
};

module.exports = userResolvers;
