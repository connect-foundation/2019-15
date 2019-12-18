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
};
