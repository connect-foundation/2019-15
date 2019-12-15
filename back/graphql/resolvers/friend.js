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
    deleteFriend: async (obj, { id }, { BeforeFriends, Friends, req, sequelize }) => {
      let transaction;
      try {
        transaction = await sequelize.transaction();
        const countFriendDeleted = await Friends.destroy({
          where: {
            [Op.or]: [
              { [Op.and]: [{ pFriendId: id }, { sFriendId: req.user.id }] },
              { [Op.and]: [{ pFriendId: req.user.id }, { sFriendId: id }] },
            ],
          },
          transaction,
        });
        if (!countFriendDeleted) throw new Error('삭제할 친구가 없습니다');
        const countBeforeFriendDeleted = await BeforeFriends.destroy({
          where: {
            [Op.or]: [
              { [Op.and]: [{ pFriendId: id }, { sFriendId: req.user.id }] },
              { [Op.and]: [{ pFriendId: req.user.id }, { sFriendId: id }] },
            ],
          },
          transaction,
        });
        if (!countBeforeFriendDeleted) throw new Error('삭제할 친구 요청이 없습니다');
        transaction.commit();
        return {
          id,
        };
      } catch (e) {
        console.log(e);
        if (transaction) await transaction.rollback();
        throw new Error('친구 삭제에 실패했어요.');
      }
    },
  },
};

module.exports = friendResolvers;
