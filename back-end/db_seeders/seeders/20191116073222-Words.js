const request = require('request-promise-native');
const cheerio = require('cheerio');
const crawling = require('../crawling');

module.exports = {
  up: (queryInterface) => {
    return new Promise((resolve) => {
      const json = [];
      let progress = 0;

      queryInterface.bulkInsert('Words', [
        { word: '강아지', categoryId: null, userId: 1 },
        { word: '고양이', categoryId: null, userId: 2 },
        { word: '치킨', categoryId: null, userId: 3 },
        { word: '피자', categoryId: null, userId: 4 },
        { word: '곤드레밥', categoryId: null, userId: 5 },
        { word: '두부밥', categoryId: null, userId: 6 },
        { word: '보리밥', categoryId: null, userId: 7 },
        { word: '비빔밥', categoryId: null, userId: 8 },
        { word: '쌀밥', categoryId: null, userId: 9 },
        { word: '약밥', categoryId: null, userId: 10 },
        { word: '볶음밥', categoryId: null, userId: 11 },
        { word: '영양밥', categoryId: null, userId: 12 },
        { word: '무감자밥', categoryId: null, userId: 13 },
        { word: '닭죽', categoryId: null, userId: 14 },
        { word: '방풍죽', categoryId: null, userId: 15 },
        { word: '아구찜', categoryId: null, userId: 16 },
        { word: '전복죽', categoryId: null, userId: 17 },
        { word: '타락죽', categoryId: null, userId: 18 },
        { word: '상이죽', categoryId: null, userId: 19 },
        { word: '호박죽', categoryId: null, userId: 20 },
        { word: '팥죽', categoryId: null, userId: 21 },
        { word: '배추김치', categoryId: null, userId: 22 },



      ]);

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
