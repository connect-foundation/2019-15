const Sequelize = require('sequelize');
const {
  MIN_ID,
  MAX_SCORE,
  CURSOR_LENGTH,
  INT_TO_STRING_PADDING,
} = require('./constants/ranking');

const { Op } = Sequelize;

const getScoreOrdering = (order) => {
  return order === 'ASC' ? ['score'] : ['score', 'DESC'];
};

const splitCursor = (cursor) => {
  return {
    id: parseInt(cursor.slice(0, CURSOR_LENGTH / 2), 10),
    score: parseInt(cursor.slice(CURSOR_LENGTH / 2, CURSOR_LENGTH), 10),
  };
};

module.exports = {
  Query: {
    ranking: async (obj, { order, first, after }, { Users }) => {
      const totalCountArr = await Users.findAll({
        attributes: [
          [Sequelize.fn('COUNT', Sequelize.col('id')), 'totalCount'],
        ],
      });

      const { id, score } = after
        ? splitCursor(after)
        : { id: MIN_ID, score: MAX_SCORE };

      const nodes = await Users.findAll({
        where: {
          [Op.and]: [
            {
              id: {
                [Op.ne]: id,
              },
            },
            {
              score: {
                [Op.lte]: score,
              },
            },
          ],
        },
        order: [getScoreOrdering(order), Sequelize.col('id')],
        limit: first,
      });

      const edgesWithCursor = nodes.map((node) => {
        return {
          node,
          cursor:
            node.id
              .toString()
              .padStart(CURSOR_LENGTH / 2, INT_TO_STRING_PADDING) +
            node.score
              .toString()
              .padStart(CURSOR_LENGTH / 2, INT_TO_STRING_PADDING),
        };
      });

      return {
        totalCount: totalCountArr[0].dataValues.totalCount,
        edges: edgesWithCursor,
        pageInfo: {
          endCursor: edgesWithCursor.length
            ? edgesWithCursor[edgesWithCursor.length - 1].cursor
            : null,
          hasNextPage: edgesWithCursor.length === first,
        },
      };
    },
  },
};
