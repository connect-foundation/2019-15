const Sequelize = require('sequelize');

const { Op } = Sequelize;

const friendResolvers = {
  Query: {
    addFriendForTest: (obj, args, { Friends }) => {
      Friends.create({ pFriendId: 4, sFriendId: 22 }).then({}, () => {
        console.log('already exists');
      });
      Friends.create({ pFriendId: 22, sFriendId: 4 }).then({}, () => {
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
    friends: (obj, args, { Friends, Users, req }) => {
      return Users.findAll({
        type: Sequelize.QueryTypes.SELECT,
        include: [
          {
            model: Friends,
            where: {
              [Op.and]: [{ sFriendId: Sequelize.col('Users.id') }, { pFriendId: req.user.id }],
            },
          },
        ],
      });
    },
    findFriendRequests: async (obj, args, { BeforeFriends, Users, req }) => {
      const sFriendRows = await BeforeFriends.findAll({
        where: { [Op.and]: [{ sFriendId: req.user.id }, { friendStateId: 1 }] },
      });
      return Users.findAll({
        where: { id: sFriendRows.map((acc) => acc.dataValues.pFriendId) },
      });
    },
    deleteFriend: async (obj, { nickname }, { Friends, Users, req }) => {
      const idFromNickname = await Users.findOne({
        where: { nickname: nickname },
      });
      const conditionColumns = {
        where: {
          [Op.or]: [
            {
              [Op.and]: [{ pFriendId: idFromNickname.dataValues.id }, { sFriendId: req.user.id }],
            },
            {
              [Op.and]: [{ sFriendId: idFromNickname.dataValues.id }, { pFriendId: req.user.id }],
            },
          ],
        },
      };
      await Friends.destroy(conditionColumns);
      return Friends.findAll(conditionColumns);
    },
    deleteFriendRequest: async (obj, { nickname }, { BeforeFriends, Users, req }) => {
      const idFromNickname = await Users.findOne({
        where: { nickname: nickname },
      });
      const conditionColumns = {
        where: {
          [Op.and]: [{ pFriendId: idFromNickname.dataValues.id }, { sFriendId: req.user.id }],
        },
      };
      await BeforeFriends.destroy(conditionColumns);
      return BeforeFriends.findAll(conditionColumns);
    },
    acceptFriendRequest: async (obj, { nickname }, { Users, Friends, req }) => {
      // this.deleteFriendRequest({id:id, nickname:nickname}); resolver 안에서 resolver 호출하는법.....
      const idFromNickname = await Users.findOne({
        where: { nickname: nickname },
      });
      await Friends.create({
        pFriendId: idFromNickname.dataValues.id,
        sFriendId: req.user.id,
      }).then({}, () => {
        console.log('already exists');
      });
      await Friends.create({
        pFriendId: req.user.id,
        sFriendId: idFromNickname.dataValues.id,
      }).then({}, () => {
        console.log('already exists');
      });
      await Friends.update(
        { friendStateId: 2 },
        {
          where: {
            [Op.and]: [{ pFriendId: idFromNickname.dataValues.id }, { sFriendId: req.user.id }],
          },
        },
      );
      return idFromNickname;
    },
    sendFriendRequest: async (obj, { nickname }, { BeforeFriends, Users, req }) => {
      const idFromNickname = await Users.findOne({
        where: { nickname: nickname },
      });
      await BeforeFriends.create({
        pFriendId: req.user.id,
        sFriendId: idFromNickname.dataValues.id,
        friendStateId: 1,
      }).then({}, () => {
        console.log('already sent');
      });
      return idFromNickname;
    },
  },
};

module.exports = friendResolvers;
