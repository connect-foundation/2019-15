const Sequelize = require('sequelize');
const { Op } = Sequelize;

module.exports = {
  Query: {
    users: (obj, args, { Users }) => {
      return Users.findAll();
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
