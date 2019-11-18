const Sequelize = require('sequelize');

module.exports = {
  Query: {
    friends: (obj, { pFriendId }, { Friends }) => {
      return Friends.findAll({
        where: {
          pFriendId: pFriendId,
        },
      });
    },
  },
};
