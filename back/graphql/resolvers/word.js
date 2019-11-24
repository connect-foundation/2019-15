const getRandomInt = require('../../util/getRandomInt');

module.exports = {
  Query: {
    getRandomWords: async (obj, args, { Words }) => {
      const howmany = 3;
      const WordsTableLength = await Words.count();
      let randomInt = [];

      while (true) {
        if (randomInt.length < howmany) {
          randomInt.push(getRandomInt(1, WordsTableLength + 1));
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
