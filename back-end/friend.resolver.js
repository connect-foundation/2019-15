const Sequelize = require('sequelize');

const { Op } = Sequelize;
const { getPageResult, getEdgesFromNodes } = require('../../util/graphql/cursor');

const friendResolvers = {
  Query: {
    friends: async (obj, { first, after }, { Friends, Users, req }) => {
      const afterClause = after
        ? {
            id: {
              [Op.gt]: after,
            },
          }
        : {};
      const nodes = await Friends.findAll({
        where: {
          [Op.and]: [
            {
              pFriendId: req.user.id,
            },
            afterClause,
          ],
        },
        include: [
          {
            model: Users,
            as: 'sFriend',
          },
        ],
        limit: first,
        order: [['id']],
      });

      const edges = getEdgesFromNodes(nodes, (node) => node.id);
      return getPageResult(edges, first);
    },
    addFriendForTest: async (obj, args, { Friends }) => {
      try {
        await Friends.create({ pFriendId: 4, sFriendId: 22 });
        await Friends.create({ pFriendId: 22, sFriendId: 4 });
      } catch {
        console.log('already exists');
      }
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
    findFriendRequests: async (obj, args, { BeforeFriends, Users, req }) => {
      const sFriendRows = await BeforeFriends.findAll({
        where: { [Op.and]: [{ sFriendId: req.user.id }, { friendStateId: 1 }] },
      });
      return Users.findAll({
        where: { id: sFriendRows.map((acc) => acc.dataValues.pFriendId) },
      });
    },
    deleteFriend: async (obj, { nickname }, { Friends, Users, req, sequelize }) => {
      const deletedColumns = await Friends.findAll({
        include: [
          {
            model: Users,
            as: 'sFriend',
            where: { [Op.or]: [{ nickname: nickname }, { id: req.user.id }] },
          },
          {
            model: Users,
            as: 'pFriend',
            where: { [Op.or]: [{ nickname: nickname }, { id: req.user.id }] },
          },
        ],
      });

      let transaction;
      try {
        transaction = await sequelize.transaction();
        await Friends.destroy({ where: { id: deletedColumns[0].dataValues.id }, transaction });
        await Friends.destroy({ where: { id: deletedColumns[1].dataValues.id }, transaction });
        await transaction.commit();
        return {
          nickname: nickname,
        };
      } catch (e) {
        if (transaction) await transaction.rollback();
        throw new Error(e);
      }
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
      const idFromNickname = await Users.findOne({
        where: { nickname: nickname },
      });
      try {
        await Friends.create({
          pFriendId: idFromNickname.dataValues.id,
          sFriendId: req.user.id,
        });
        await Friends.create({
          pFriendId: req.user.id,
          sFriendId: idFromNickname.dataValues.id,
        });
      } catch {
        console.log('already exists');
      }
      await Friends.update(
        { friendStateId: 2 },
        {
          where: {
            [Op.and]: [{ pFriendId: idFromNickname.dataValues.id }, { sFriendId: req.user.id }],
          },
        },
      );
      return {
        user: idFromNickname,
        result: true,
      };
    },

    sendFriendRequest: async (obj, { nickname }, { Friends, BeforeFriends, Users, req }) => {
      // 이미 친구인지 확인
      const checkFriendsTable = await Friends.findAll({
        include: [
          {
            model: Users,
            as: 'sFriend',
            where: { [Op.or]: [{ nickname: nickname }, { id: req.user.id }] },
          },
          {
            model: Users,
            as: 'pFriend',
            where: { [Op.or]: [{ nickname: nickname }, { id: req.user.id }] },
          },
        ],
      });

      if (checkFriendsTable.length > 1) throw new Error(`${nickname}님과는 이미 친구입니다.`);

      // 친구 요청
      const idFromNickname = await Users.findOne({
        where: { nickname: nickname },
      });

      try {
        await BeforeFriends.create({
          pFriendId: req.user.id,
          sFriendId: idFromNickname.dataValues.id,
          friendStateId: 1,
        });
      } catch (e) {
        if (e.message === 'Validation error') {
          throw new Error(`이미 친구 신청을 보냈습니다.`);
        }
        throw new Error(`${nickname}님은 유저가 아닙니다.`);
      }
      return { nickname: nickname };
    },
  },
};

module.exports = friendResolvers;
