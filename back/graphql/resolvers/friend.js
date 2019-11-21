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
  },
  Mutation: {
    friends: (obj, { pFriendId }, { Friends, Users }) => {
      return Users.findAll({
        type: Sequelize.QueryTypes.SELECT,
        include: [
          {
            model: Friends,
            where: {
              [Op.and]: [{ sFriendId: Sequelize.col('Users.id') }, { pFriendId: pFriendId }],
            },
          },
        ],
      });
    },
    findFriendRequests: async (obj, { sFriendId }, { BeforeFriends, Users }) => {
      const sFriendRows = await BeforeFriends.findAll({
        where: { [Op.and]: [{ sFriendId: sFriendId }, { friendStateId: 1 }] },
      });
      return Users.findAll({
        where: { id: sFriendRows.map((acc) => acc.dataValues.pFriendId) },
      });
    },
    deleteFriend: async (obj, { id, nickname }, { Friends, Users }) => {
      const idFromNickname = await Users.findOne({
        where: { nickname: nickname },
      });
      const conditionColumns = {
        where: {
          [Op.or]: [
            {
              [Op.and]: [{ pFriendId: idFromNickname.dataValues.id }, { sFriendId: id }],
            },
            {
              [Op.and]: [{ sFriendId: idFromNickname.dataValues.id }, { pFriendId: id }],
            },
          ],
        },
      };
      await Friends.destroy(conditionColumns);
      return Friends.findAll(conditionColumns);
    },
    deleteFriendRequest: async (obj, { id, nickname }, { BeforeFriends, Users }) => {
      const idFromNickname = await Users.findOne({
        where: { nickname: nickname },
      });
      const conditionColumns = {
        where: {
          [Op.and]: [{ pFriendId: idFromNickname.dataValues.id }, { sFriendId: id }],
        },
      };
      await BeforeFriends.destroy(conditionColumns);
      return BeforeFriends.findAll(conditionColumns);
    },
    acceptFriendRequest: async (obj, { id, nickname }, { Users, Friends }) => {
      // this.deleteFriendRequest({id:id, nickname:nickname}); resolver 안에서 resolver 호출하는법.....
      const idFromNickname = await Users.findOne({
        where: { nickname: nickname },
      });
      await Friends.create({ pFriendId: idFromNickname.dataValues.id, sFriendId: id }).then(
        {},
        (err) => {
          console.log('already exists');
        },
      );
      await Friends.create({ pFriendId: id, sFriendId: idFromNickname.dataValues.id }).then(
        {},
        (err) => {
          console.log('already exists');
        },
      );
      await Friends.update(
        { friendStateId: 2 },
        {
          where: { [Op.and]: [{ pFriendId: idFromNickname.dataValues.id }, { sFriendId: id }] },
        },
      );
      return idFromNickname;
    },
  },
};
