const Sequelize = require('sequelize');

const { Op } = Sequelize;
const MAX_SCORE = 999999999;
const MIN_ID = 0;

module.exports = {
  Query: {
    ranking: async (obj, { order, first, after }, { Users }) => {
      const totalCountArr = await Users.findAll({
        attributes: [
          [Sequelize.fn('COUNT', Sequelize.col('id')), 'totalCount'],
        ],
      });

      let scoreOrdering = ['score', 'DESC'];
      if (order === 'ASC') scoreOrdering = ['score'];
      const id = after ? parseInt(after.slice(0, 10), 10) : MIN_ID;
      const score = after ? parseInt(after.slice(10, 20), 10) : MAX_SCORE;

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
        order: [scoreOrdering, Sequelize.col('id')],
        limit: first,
      });

      const edgesWithCursor = nodes.map((node) => {
        return {
          node,
          cursor:
            node.id.toString().padStart(10, '0') +
            node.score.toString().padStart(10, '0'),
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
