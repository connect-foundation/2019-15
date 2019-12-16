const maxPeopleNum = {
  '3명': 3,
  '6명': 6,
  '12명': 12,
  '100명': 100,
  비밀방: 100,
};

const roomState = {
  EMPTY: 0,
  WAITING: 1,
  SELECTING_WORD: 2,
  PLAYING_QUESTION: 3,
  END_GAME: 4,
};

const PRIVATE_ROOM_NAME = '비밀방';

const defaultRoomSetting = {
  totalRound: 3,
};

const escapeResultCode = {
  IS_WAITING: 1,
  IS_SELECTING_WORD: 2,
  EXAMINER_IS_ESCAPED: 3,
  NON_EXAMINER_IS_ESCAPED: 4,
};

module.exports = {
  maxPeopleNum,
  roomState,
  defaultRoomSetting,
  PRIVATE_ROOM_NAME,
  escapeResultCode,
};
