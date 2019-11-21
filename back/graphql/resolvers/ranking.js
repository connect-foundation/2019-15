const Sequelize = require('sequelize');

const { Op } = Sequelize;

const { MIN_ID, MAX_INT, CURSOR_LENGTH, INT_TO_STRING_PADDING } = require('./constants/ranking');

const getScoreOrdering = (order) => {
  return order === 'ASC' ? ['score'] : ['score', 'DESC'];
};

const splitCursor = (cursor) => {
  return {
    id: parseInt(cursor.slice(0, CURSOR_LENGTH / 2), 10),
    score: parseInt(cursor.slice(CURSOR_LENGTH / 2, CURSOR_LENGTH), 10),
  };
};

const makeNodeToEdge = (node) => {
  return {
    node,
    cursor:
      node.id.toString().padStart(CURSOR_LENGTH / 2, INT_TO_STRING_PADDING) +
      node.score.toString().padStart(CURSOR_LENGTH / 2, INT_TO_STRING_PADDING),
  };
};

const toRankingResult = (edgesWithCursor, totalCount, first) => {
  return {
    totalCount: totalCount,
    edges: edgesWithCursor,
    pageInfo: {
      endCursor: edgesWithCursor.length ? edgesWithCursor[edgesWithCursor.length - 1].cursor : null,
      hasNextPage: edgesWithCursor.length === first,
    },
  };
};

const rankingResolvers = {
  Query: {
    rankingAll: async (obj, { order, first, after }, { Users }) => {
      const { id, score } = after ? splitCursor(after) : { id: MIN_ID, score: MAX_INT };

      const { rows: nodes, count: totalCount } = await Users.findAndCountAll({
        where: {
          [Op.and]: [{ id: { [Op.ne]: id } }, { score: { [Op.lte]: score } }],
        },
        order: [getScoreOrdering(order), 'id', 'nickname'],
        limit: first,
      });

      const edgesWithCursor = nodes.map((node) => makeNodeToEdge(node));

      return toRankingResult(edgesWithCursor, totalCount, first);
    },
    rankingFriends: async (obj, { order, first, after }, { Users, Friends, req }) => {
      const { id, score } = after ? splitCursor(after) : { id: MIN_ID, score: MAX_INT };

      const { rows: nodes, count: totalCount } = await Friends.findAndCountAll({
        where: { pFriendId: req.user.id },
        include: [
          {
            model: Users,
            where: {
              [Op.and]: [{ id: { [Op.ne]: id } }, { score: { [Op.lte]: score } }],
            },
          },
        ],
        order: [
          [{ model: Users }, ...getScoreOrdering(order)],
          [{ model: Users }, 'id'],
          [{ model: Users }, 'nickname'],
        ],
        limit: first,
      });
      const edgesWithCursor = nodes.map(({ User }) => makeNodeToEdge(User));

      return toRankingResult(edgesWithCursor, totalCount, first);
    },
  },
};

module.exports = rankingResolvers;
