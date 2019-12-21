function getScore(numerator, denominator, defaultScore) {
  return Math.floor((numerator / denominator) * defaultScore);
}

module.exports = getScore;
