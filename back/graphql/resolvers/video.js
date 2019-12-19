const Sequelize = require('sequelize');

const { Op } = Sequelize;
const { getPageResult, getEdgesFromNodes } = require('../../util/graphql/cursor');

module.exports = {
  Query: {
    getLatestWordsByUser: async (obj, { first, after }, { DrawingHistories, req }) => {
      const afterClause = after
        ? {
            id: {
              [Op.lt]: after,
            },
          }
        : {};
      const nodes = await DrawingHistories.findAll({
        where: {
          [Op.and]: [
            {
              userId: req.user.id,
            },
            afterClause,
          ],
        },
        order: [['id', 'DESC']],
        limit: first,
      });

      const edges = getEdgesFromNodes(nodes, (node) => node.id);
      return getPageResult(edges, first);
    },
    getCanvasDatasByQuestionId: async (obj, { questionId }, { CanvasDatas }) => {
      return CanvasDatas.findAll({
        where: {
          questionId: questionId,
        },
        order: [['id', 'ASC']],
      });
    },
  },
  Mutation: {
    saveCanvasData: async (
      obj,
      { questionWord, data },
      { DrawingHistories, CanvasDatas, req, sequelize },
    ) => {
      const question = await DrawingHistories.findOne({
        where: {
          [Op.and]: [
            {
              word: questionWord,
            },
            { userId: req.user.id },
          ],
        },
        order: [['id', 'DESC']],
      });

      const questionId = question.dataValues.id;
      let transaction;
      try {
        transaction = await sequelize.transaction();
        await CanvasDatas.bulkCreate([{ questionId, data }]);
        await transaction.commit();
        return { questionId: questionId, dataLength: data.length };
      } catch (e) {
        if (transaction) await transaction.rollback();
        throw new Error(e);
      }
    },
  },
};
