const urlString = (categoryNum) =>
  `https://krdict.korean.go.kr/dicSearchDetail/searchDetailSenseCategoryResult?searchFlag=Y&sort=W&currentPage=1&ParaWordNo=&deleteWord_no=&returnUrl=&downloadInfo=&downloadInfoText=&downloadGubun=&downloadType=&downloadItemList=&downloadMultilanList=&syllablePosition=&priMoveUrl=&searchType=D&lgCategoryCode=${categoryNum}&miCategoryCode=-1&blockCount=100`;

const urlSet = [];

for (let i = 1; i <= 14; i += 1) {
  urlSet.push(urlString(i));
}

module.exports = { urlSet };
