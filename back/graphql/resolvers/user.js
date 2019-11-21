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
};

module.exports = userResolvers;
