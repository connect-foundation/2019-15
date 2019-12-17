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
  },
};
