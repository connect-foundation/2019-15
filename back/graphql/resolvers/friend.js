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
  },
  Mutation: {
    deleteFriend: async (obj, { id, nickname }, { BeforeFriends, Friends, req, sequelize }) => {
      let transaction;
      try {
        transaction = await sequelize.transaction();
        await Friends.destroy({
          where: {
            [Op.or]: [
              { [Op.and]: [{ pFriendId: id }, { sFriendId: req.user.id }] },
              { [Op.and]: [{ pFriendId: req.user.id }, { sFriendId: id }] },
            ],
          },
          transaction,
        });
        await BeforeFriends.destroy({
          where: {
            [Op.or]: [
              { [Op.and]: [{ pFriendId: id }, { sFriendId: req.user.id }] },
              { [Op.and]: [{ pFriendId: req.user.id }, { sFriendId: id }] },
            ],
          },
          transaction,
        });
        transaction.commit();
        return {
          id,
          nickname,
        };
      } catch (e) {
        console.log(e);
        if (transaction) await transaction.rollback();
        throw new Error(`${nickname}님 친구 삭제에 실패했어요.`);
      }
    },
  },
};

module.exports = friendResolvers;
