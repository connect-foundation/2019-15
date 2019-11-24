const request = require('request');
const cheerio = require('cheerio');

const urlString = (categoryNum) =>
  `https://krdict.korean.go.kr/dicSearchDetail/searchDetailSenseCategoryResult?searchFlag=Y&sort=W&currentPage=1&ParaWordNo=&deleteWord_no=&returnUrl=&downloadInfo=&downloadInfoText=&downloadGubun=&downloadType=&downloadItemList=&downloadMultilanList=&syllablePosition=&priMoveUrl=&searchType=D&lgCategoryCode=${categoryNum}&miCategoryCode=-1&blockCount=100`;

const urlSet = [];

for (let i = 1; i <= 14; i += 1) {
  urlSet.push(urlString(i));
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return new Promise((resolve) => {
      urlSet.forEach((url) => {
        const json = [];
        let word;
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
            }
          });
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
                json.push({ word: word, category: category, userId: null });
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
