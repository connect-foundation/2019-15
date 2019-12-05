const uuid = require('uuid/v1');
const { maxPeopleNum } = require('../config/roomConfig');
const Timer = require('../util/timer/Timer');
const roomState = require('../config/roomState');

const makeRoomId = () => {
  return uuid();
};

class Room {
  constructor(gameIo) {
    this.roomId = null;
    this.players = [];
    this.wordSet = null;
    this.word = null;
    this.timer = new Timer();
    this.state = roomState.EMPTY;
    this.examinerIndex = null;
    this.totalRound = null;
    this.currentRound = null;
    this.answererCount = 0;
    this.timer.setTimeOutCallback(this.timeOutCallback.bind(this, gameIo));
  }

  prepareFirstQuestion() {
    this.state = roomState.SELECTING_WORD;
    this.examinerIndex = this.players.length - 1;
    this.players[this.examinerIndex].privileged = true;
  }

  prepareNextQuestion() {
    this.state = roomState.SELECTING_WORD;
    this.word = null;
    this.timer.stop();
    this.examinerIndex -= 1;
    this.answererCount = 0;
  }

  addPlayer(user) {
    this.players.push(user);
    if (this.state === roomState.EMPTY) this.state = roomState.WAITING;
  }

  removePlayer(userIndex) {
    this.players.splice(userIndex, 1);
  }

  // 최소 시작 인원을 기다리다가 충족된 경우. 즉, 새 게임
  isPlayable() {
    return this.state === roomState.WAITING && this.players.length >= 2;
  }

  // 이미 게임이 시작했으며, 게임이 아직 종료되지 않은 경우. 즉, 난입
  isPlaying() {
    return (
      this.players.length >= 2 &&
      (this.state === roomState.SELECTING_WORD || this.state === roomState.PLAYING_QUESTION)
    );
  }

  getUserIndexBySocketId(gameSocket) {
    return this.players.findIndex((user) => user.socket.id === gameSocket.id);
  }

  isQuestionEnd() {
    return this.answererCount === this.players.length - 1;
  }

  timeOutCallback(gameIo) {
    this.examinerIndex -= 1;
    // this.room.currentExaminer가 -1이라면 한 라운드가 종료된 것
    const nextExaminer = this.players[this.examinerIndex];
    // 클라에게 해당 문제를 끝내라는 시그널을 전송한다
    // todo: 다음 출제자를 구별하기 위해 nickname이 나은가? 아니면 id?
    gameIo.in(this.roomId).emit('endQuestion', {
      nickname: nextExaminer.nickname,
      scores: this.players.map((player) => [player.nickname, player.score]),
      answer: this.word,
    });
  }
}

const RoomManager = {
  roomList: ['3명', '6명', '12명', '100명', '비밀방'],
  room: { '3명': {}, '6명': {}, '12명': {}, '100명': {}, 비밀방: {} },
  maxPeopleNum,

  // 방이 없을 때 새로운 방을 만들고 반환.
  addRoom: function(roomName, gameIo) {
    const newRoom = new Room(gameIo);
    const roomId = makeRoomId();
    newRoom.roomId = roomId;
    newRoom.state = roomState.EMPTY;
    this.room[roomName][roomId] = newRoom;

    return roomId;
  },

  // 수용가능한 방을 하나 반환, 없으면 생성해서 반환
  getEnableRoomId: function(roomName, gameIo) {
    const nRooms = this.room[roomName];

    // find의 반환값이 undefined일 수 있으므로, destructuring은 불가능
    // room[0] : key, room[1] : room
    let room = Object.entries(nRooms).find(
      ([roomId, _room]) => _room.players.length < maxPeopleNum[roomName],
    );

    if (!room) {
      room = [];
      room.push(this.addRoom(roomName, gameIo));
    }
    return room[0];
  },

  getEnableSecretRoom(roomId) {
    const secretRoomList = this.room['비밀방'];

    if (!secretRoomList.hasOwnProperty(roomId)) secretRoomList[roomId] = new Room();

    return secretRoomList[roomId];
  },

  isExistRoom({ roomType, roomId }) {
    return roomType && roomId && this.room[roomType].hasOwnProperty(roomId);
  },

  getRoomByRoomId(roomName, roomId) {
    return this.room[roomName][roomId];
  },
};

module.exports = { RoomManager, Room };
