// 최댓값은 제외, 최솟값은 포함
function getRandomInt(min, max) {
  const myMin = Math.ceil(min);
  const myMax = Math.floor(max);
  return Math.floor(Math.random() * (myMax - myMin)) + myMin;
}

module.exports = getRandomInt;
