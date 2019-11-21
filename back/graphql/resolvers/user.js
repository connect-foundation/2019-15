const userResolvers = {
  Query: {
    users: (obj, args, { Users }) => {
      return Users.findAll();
    },
    checkNicknameAvailable: async (obj, { nickname }, { Words, user }) => {
      if (user.nickname === nickname) return false;
      const wordFound = await Words.findOne({
        where: {
          word: nickname,
        },
      });
      return !wordFound || !wordFound.dataValues.userId;
    },
  },
  Mutation: {
    changeNickname: async (obj, { nickname }, { Users, Words, user }) => {
      const wordFound = await Words.findOne({
        where: {
          word: nickname,
        },
      });

      if (wordFound && wordFound.dataValues.userId) throw new Error('duplicated');

      if (!wordFound) {
        await Words.create({ word: nickname, categoryId: null, userId: user.id });
      } else if (!wordFound.dataValues.userId) {
        await Words.update(
          {
            userId: user.id,
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
            id: user.id,
          },
        },
      );
      return true;
    },
  },
};

module.exports = userResolvers;
