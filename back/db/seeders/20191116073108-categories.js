const request = require('request');
const cheerio = require('cheerio');
const crawling = require('../crawling');

module.exports = {
  up: (queryInterface) => {
    return new Promise((resolve) => {
      const json = [];

      crawling.urlSet.forEach((url, idx) => {
        let category;

        request(url, function(error, response, body) {
          const HTML = cheerio.load(body);

          HTML('#lcateLayer > ul > li').each(function() {
            if (
              HTML(this)
                .find('input:checked')
                .val() !== undefined
            ) {
              category = HTML(this)
                .find('li > label')
                .text()
                .trim();
              json.push({ idx: idx, category: category });
            }
          });
        });
      });

      setTimeout(() => {
        function sortByIdx(a, b) {
          return a.idx > b.idx ? 1 : -1;
        }
        json.sort(sortByIdx);

        const values = [];
        json.forEach((element) => {
          values.push({ category: element.category });
        });

        queryInterface.bulkInsert('Categories', values);
        resolve('Done');
      }, 4000);
    }).catch((error) => {
      console.error(error);
    });
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Words', null, {});
  },
};
