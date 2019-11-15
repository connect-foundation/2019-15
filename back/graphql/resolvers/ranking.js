const Sequelize = require('sequelize');

module.exports = {
  Query: {
    ranking: (obj, { order, limit, offset }, { Users }) => {
      let scoreOrdering = ['score', 'DESC'];
      if (order === 'ASC') scoreOrdering = ['score'];

      return Users.findAll({
        offset,
        limit,
        order: [scoreOrdering],
      });
    },
  },
};
