const Sequelize = require('sequelize');

const { Op } = Sequelize;

module.exports = {
  Query: {
    getCategories: async (obj, args, { Categories }) => {
      const result = await Categories.findAll();
      return result;
    },
  },
};
