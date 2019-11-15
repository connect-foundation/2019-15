const Sequelize = require('sequelize');

module.exports = {
  Query: {
    ranking: (obj, { order, limit, offset }, { User }) => {
      let scoreOrdering = ['score', 'DESC'];
      if (order === 'ASC') scoreOrdering = ['score'];

      return User.findAll({
        offset,
        limit,
        order: [scoreOrdering],
      });
    },
  },
};
