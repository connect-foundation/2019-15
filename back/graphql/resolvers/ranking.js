const Sequelize = require('sequelize');

const { Op } = Sequelize;

const { getPageResult, intTo10Str, getEdgesFromNodes } = require('../../util/graphql/cursor');

const getCursor = ({ id, score }) => {
  return intTo10Str(score) + intTo10Str(id);
};

const getOrderOp = (order) => {
  return order === 'ASC' ? Op.gt : Op.lt;
};

const rankingResolvers = {
  Query: {
    rankingAll: async (obj, { order, first, after }, { Users }) => {
      const afterClause = after
        ? {
            having: {
              cursor: { [getOrderOp(order)]: after },
            },
          }
        : {};
      const nodes = await Users.findAll({
        attributes: {
          include: [
            [
              Sequelize.fn(
                'concat',
                Sequelize.fn('lpad', Sequelize.col('score'), 10, '0'),
                Sequelize.fn('lpad', Sequelize.col('id'), 10, '0'),
              ),
              'cursor',
            ],
          ],
        },
        ...afterClause,
        order: [['score', order], ['id', order]],
        limit: first,
      });

      const edges = getEdgesFromNodes(nodes, getCursor);
      console.log(edges);

      return getPageResult(edges, first);
    },
    rankingFriends: async (obj, { order, first, after }, { Users, Friends, req }) => {
      const afterClause = after
        ? {
            having: {
              'User.cursor': { [getOrderOp(order)]: after },
            },
          }
        : {};
      const nodes = await Friends.findAll({
        where: { pFriendId: req.user.id },
        include: [
          {
            model: Users,
            attributes: {
              include: [
                [
                  Sequelize.fn(
                    'concat',
                    Sequelize.fn('lpad', Sequelize.col('User.score'), 10, '0'),
                    Sequelize.fn('lpad', Sequelize.col('User.id'), 10, '0'),
                  ),
                  'cursor',
                ],
              ],
            },
          },
        ],
        ...afterClause,
        order: [[{ model: Users }, 'score', order], [{ model: Users }, 'id', order]],
        limit: first,
      });

      const friendNodes = nodes.map(({ dataValues }) => dataValues.User);
      const edges = getEdgesFromNodes(friendNodes, getCursor);

      return getPageResult(edges, first);
    },
  },
};

module.exports = rankingResolvers;
