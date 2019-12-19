const Sequelize = require('sequelize');

const { Op } = Sequelize;

module.exports = {
  Query: {
    getLatestWordsByUser: async (obj, args, { DrawingHistories, req }) => {
      return DrawingHistories.findAll({
        where: {
          userId: req.user.id,
        },
        order: [['id', 'DESC']],
        limit: 10,
      });
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
