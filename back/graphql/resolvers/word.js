const Sequelize = require('sequelize');
const getRandomInt = require('../../util/common/getRandomInt');

const { Op } = Sequelize;

module.exports = {
  Query: {
    getRandomWords: async (obj, { categoryId }, { Words }) => {
      const howmany = 3;
      const WordsTableLength = await Words.count();
      let randomInt = [];

      const availableRowsQuantity = await Words.count({ where: { categoryId: { [Op.ne]: null } } });
      if (availableRowsQuantity <= howmany) return [];

      let endFlag = true;
      while (endFlag) {
        if (randomInt.length < howmany) {
          const selectedNumber = getRandomInt(1, WordsTableLength + 1);
          let selectedRow = null;
          if (categoryId) {
            selectedRow = await Words.findOne({
              where: { [Op.and]: [{ id: selectedNumber }, { categoryId: categoryId }] },
            });
          } else selectedRow = await Words.findOne({ where: { id: selectedNumber } });

          if (!selectedRow) continue;

          if (selectedRow.dataValues.userId === null) randomInt.push(selectedNumber);
        } else {
          randomInt = randomInt.sort().filter(function(item, pos, array) {
            return !pos || item !== array[pos - 1];
          });
          if (randomInt.length >= howmany) endFlag = false;
        }
      }
      return Words.findAll({
        where: { id: randomInt },
      });
    },
  },
};
