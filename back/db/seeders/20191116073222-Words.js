const request = require('request');
const cheerio = require('cheerio');
const crawling = require('../crawling');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return new Promise((resolve) => {
      crawling.urlSet.forEach((url, idx) => {
        const json = [];
        let word;

        request(url, function(error, response, body) {
          const HTML = cheerio.load(body);

          HTML('#page_naviArea2 > div.floatL.sub_left > ul.search_list.w700.printArea > li').each(
            function() {
              const kind = HTML(this)
                .find('p > em')
                .text();
              if (kind.trim() === '「명사」') {
                word = HTML(this)
                  .find('p > a > strong')
                  .text()
                  .trim();
                json.push({ word: word, categoryId: idx + 1, userId: null });
              }
            },
          );
          queryInterface.bulkInsert('Words', json);
        });
      });

      setTimeout(() => {
        resolve('Done');
      }, 4000);
    }).catch((error) => {
      console.error(error);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Words', null, {});
  },
};
