const Sequelize = require('sequelize');

module.exports = {
  Query: {
    friends: async (obj, { pFriendId }, { Friends, Users }) => {
      return await Friends.findAll({
        where: {
          pFriendId: pFriendId,
        },
      });
    },
  },
};
