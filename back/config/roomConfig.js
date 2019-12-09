const maxPeopleNum = {
  '3명': 3,
  '6명': 6,
  '12명': 12,
  '100명': 100,
  비밀방: 100,
};

const state = {
  WAIT_ANOTHER_PLAYER: 0,
  SELECT_WORD: 1,
  PLAYING_QUESTION: 2,
  QUESTION_END: 3,
  ROUND_END: 4,
  GAME_END: 5,
};

const PRIVATE_ROOM_NAME = '비밀방';
module.exports = { maxPeopleNum, state, PRIVATE_ROOM_NAME };
