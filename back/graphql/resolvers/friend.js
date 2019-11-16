const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  Query: {
    friends: async (obj, { pFriendId }, { Friends , Users}) => {
      return Users.findAll({
        type: Sequelize.QueryTypes.SELECT,
        include: [{
          model: Friends,
          where: {
            [Op.and]:
              [{sFriendId:Sequelize.col('Users.id')},
                {pFriendId:pFriendId}]
          }
        }]
      })
    }
  }
};
