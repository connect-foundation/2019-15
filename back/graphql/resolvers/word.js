const Sequelize = require('sequelize');
const getRandomInt = require('../../util/getRandomInt');

const { Op } = Sequelize;

module.exports = {
  Query: {
    getRandomWords: async (obj, args, { Words }) => {
      const howmany = 3;
      const WordsTableLength = await Words.count();
      let randomInt = [];

      const availableRowsQuantity = await Words.count({ where: { categoryId: { [Op.ne]: null } } });
      if (availableRowsQuantity <= 0) return;

      while (true) {
        if (randomInt.length < howmany) {
          const selectedNumber = getRandomInt(1, WordsTableLength + 1);
          const selectedRow = await Words.findOne({ where: { id: selectedNumber } });
          if (selectedRow.dataValues.userId === null) randomInt.push(selectedNumber);
        } else {
          randomInt = randomInt.sort().filter(function(item, pos, array) {
            return !pos || item !== array[pos - 1];
          });
          if (randomInt.length >= howmany) break;
        }
      }
      return Words.findAll({
        where: { id: randomInt },
      });
    },
  },
};
