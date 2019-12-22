function sortScoresDecending(a, b) {
  return b[1] - a[1];
}

export default function sortScores(scores) {
  const copiedScores = Object.assign([], scores);
  return copiedScores.sort(sortScoresDecending);
}
