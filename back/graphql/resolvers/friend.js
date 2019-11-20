const Sequelize = require('sequelize');

const { Op } = Sequelize;

module.exports = {
  Query: {
    addFriendForTest: (obj, args, { Friends }) => {
      Friends.create({ pFriendId: 1, sFriendId: 2 }).then({}, (err) => {
        console.log('already exists');
      });
      Friends.create({ pFriendId: 2, sFriendId: 1 }).then({}, (err) => {
        console.log('already exists');
      });
      return Friends.findAll({
        where: {
          [Op.or]: [
            { [Op.and]: [{ pFriendId: 1 }, { sFriendId: 2 }] },
            { [Op.and]: [{ pFriendId: 2 }, { sFriendId: 1 }] },
          ],
        },
      });
    },
    findFriendRequests : async (obj, { sFriendId }, { BeforeFriends, Users }) => {
      const sFriendRows = await BeforeFriends.findAll({
        where: { sFriendId : sFriendId },
      });
      return Users.findAll({
        where: { id: sFriendRows.map((acc)=> acc.dataValues.pFriendId)},
      });
    },
  },
  Mutation: {
    friends: (obj, { pFriendId }, { Friends, Users }) => {
      return Users.findAll({
        type: Sequelize.QueryTypes.SELECT,
        include: [
          {
            model: Friends,
            where: {
              [Op.and]: [
                { sFriendId: Sequelize.col('Users.id') },
                { pFriendId: pFriendId },
              ],
            },
          },
        ],
      });
    },
    deleteFriend: async (obj, { id, nickname }, { Friends, Users }) => {
      const idFromNicknames = await Users.findOne({
        where: { nickname: nickname },
      });
      const conditionColumns = {
        where: {
          [Op.or]: [
            {
              [Op.and]: [
                { pFriendId: idFromNicknames.dataValues.id },
                { sFriendId: id },
              ],
            },
            {
              [Op.and]: [
                { sFriendId: idFromNicknames.dataValues.id },
                { pFriendId: id },
              ],
            },
          ],
        },
      };
      await Friends.destroy(conditionColumns);
      return Friends.findAll(conditionColumns);
    },
  },
};
