const Sequelize = require('sequelize');

const { Op } = Sequelize;

const { MAX_CURSOR, intTo10Str, strToInt, CURSOR_LENGTH } = require('./constants/ranking');

const getScoreOrdering = (col, order) => {
  return order === 'ASC' ? [col] : [col, 'DESC'];
};

const makeNodeToEdge = (node) => {};

const getEdgesWithCursor = (nodes) => {
  return nodes.map(({ dataValues: node }) => {
    return {
      node,
      cursor: intTo10Str(node.score) + intTo10Str(node.id),
    };
  });
};

const toRankingResult = (edgesWithCursor, first) => {
  return {
    edges: edgesWithCursor,
    pageInfo: {
      endCursor: edgesWithCursor.length ? edgesWithCursor[edgesWithCursor.length - 1].cursor : null,
      hasNextPage: edgesWithCursor.length === first,
    },
  };
};

const getOrderOp = (order) => {
  return order === 'ASC' ? Op.gt : Op.lt;
};

const rankingResolvers = {
  Query: {
    rankingAll: async (obj, { order, first, after }, { Users }) => {
      const lastEndCursor = after || MAX_CURSOR;

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
        having: {
          cursor: { [getOrderOp(order)]: lastEndCursor },
        },
        order: [['score', order], ['id', order]],
        limit: first,
      });

      const edgesWithCursor = getEdgesWithCursor(nodes);

      return toRankingResult(edgesWithCursor, first);
    },
    rankingFriends: async (obj, { order, first, after }, { Users, Friends, req }) => {
      // const { id, score } = after ? splitCursor(after) : { id: MIN_ID, score: MAX_INT };
      //
      // const { rows: nodes, count: totalCount } = await Friends.findAndCountAll({
      //   where: { pFriendId: req.user.id },
      //   include: [
      //     {
      //       model: Users,
      //       where: {
      //         [Op.or]: [
      //           { score: { [order === 'ASC' ? Op.gt : Op.lt]: score } },
      //           {
      //             [Op.and]: [
      //               { score: score },
      //               {
      //                 id: { [Op.gt]: id },
      //               },
      //             ],
      //           },
      //         ],
      //       },
      //     },
      //   ],
      //   order: [[{ model: Users }, ...getScoreOrdering(order)], [{ model: Users }, 'id']],
      //   limit: first,
      // });
      // const edgesWithCursor = nodes.map(({ User }) => makeNodeToEdge(User));
      //
      // return toRankingResult(edgesWithCursor, totalCount, first);
      const lastEndCursor = after || MAX_CURSOR;

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
        having: {
          'User.cursor': { [getOrderOp(order)]: lastEndCursor },
        },
        order: [[{ model: Users }, 'score', order], [{ model: Users }, 'id', order]],
        limit: first,
      });

      const friendNodes = nodes.map(({ dataValues }) => dataValues.User);
      console.log(friendNodes);
      const edgesWithCursor = getEdgesWithCursor(friendNodes);

      return toRankingResult(edgesWithCursor, first);
    },
  },
};

module.exports = rankingResolvers;
