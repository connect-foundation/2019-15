function sortScoresDecending(a, b) {
  return b.score - a.score;
}

export default function sortScores(scores) {
  const copiedScores = Object.assign([], scores);
  return copiedScores.sort(sortScoresDecending);
}
