const request = require('request-promise-native');
const cheerio = require('cheerio');
const crawling = require('../crawling');

module.exports = {
  up: (queryInterface) => {
    return new Promise((resolve) => {
      const json = [];
      let progress = 0;
      crawling.urlSet.forEach((url, idx) => {
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
        }).then(async function() {
          progress += 1;
          if (progress === crawling.urlSet.length) {
            await queryInterface.bulkInsert('Words', json);
            await resolve('Done');
          }
        });
      });
    }).catch((error) => {
      console.error(error);
    });
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Words', null, {});
  },
};
