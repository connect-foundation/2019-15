const { roomState, defaultRoomSetting } = require('../config/roomConfig');
const Timer = require('../util/timer/Timer');

class Room {
  constructor(gameIo) {
    this.roomId = null;
    this.players = [];
    this.wordSet = null;
    this.word = null;
    this.timer = new Timer();
    this.state = roomState.EMPTY;
    this.examinerIndex = null;
    this.totalRound = defaultRoomSetting.totalRound;
    this.currentRound = 1;
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
    this.players.forEach((player) => {
      player.privileged = false;
    });
    this.answererCount = 0;
    this.examinerIndex -= 1;
    this.players[this.examinerIndex].privileged = true;
  }

  prepareNextRound() {
    this.state = roomState.SELECTING_WORD;
    this.word = null;
    this.timer.stop();
    this.players.forEach((player) => {
      player.privileged = false;
    });
    this.answererCount = 0;
    this.examinerIndex = this.players.length - 1;
    this.players[this.examinerIndex].privileged = true;
    this.currentRound += 1;
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

  isAllPlayerAnswered() {
    return this.answererCount === this.players.length - 1;
  }

  getUserIndexBySocketId(gameSocket) {
    return this.players.findIndex((user) => user.socket.id === gameSocket.id);
  }

  isQuestionEnd() {
    return this.answererCount === this.players.length - 1;
  }

  timeOutCallback(gameIo) {
    const answer = this.word;
    // 한 라운드가 끝나는 경우
    if (this.examinerIndex === 0) this.prepareNextRound();
    // 아직 한 라운드가 끝나지 않은 경우
    else this.prepareNextQuestion();

    const nextExaminer = this.getExaminer();
    gameIo.in(this.roomId).emit('endQuestion', {
      nextExaminerSocketId: nextExaminer.socket.id,
      _scores: this.getScores(),
      answer: answer,
      currentRound: this.currentRound,
      totalRound: this.totalRound,
    });
  }

  getExaminerSocketId() {
    return this.players[this.examinerIndex].socket.id;
  }

  getExaminer() {
    return this.players[this.examinerIndex];
  }

  getScores() {
    return this.players.map((player) => [player.nickname, player.score]);
  }
}

module.exports = { Room };
