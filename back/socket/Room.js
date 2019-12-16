const { Op } = require('sequelize');
const models = require('../db/models');
const { roomState, defaultRoomSetting } = require('../config/roomConfig');
const Timer = require('../util/timer/Timer');
const makeReducerWithPromise = require('../util/makeReducerWithPromise');

class Room {
  constructor(gameIo) {
    this.roomId = null;
    this.players = [];
    this.wordSet = null;
    this.word = null;
    this.openIndex = 0;
    this.timer = new Timer();
    this.state = roomState.EMPTY;
    this.examinerIndex = null;
    this.totalRound = defaultRoomSetting.totalRound;
    this.currentRound = 1;
    this.answererCount = 0;
    this.timer.setTimeOutCallback(this.questionEndCallback.bind(this, gameIo));
    this.roomOwner = null;
  }

  prepareFirstQuestion() {
    this.state = roomState.SELECTING_WORD;
    this.examinerIndex = this.players.length - 1;
    this.players[this.examinerIndex].privileged = true;
  }

  initRoomState() {
    this.wordSet = null;
    this.word = null;
    this.openIndex = 0;
    this.state = roomState.EMPTY;
    this.examinerIndex = null;
    this.totalRound = defaultRoomSetting.totalRound;
    this.currentRound = 1;
    this.answererCount = 0;
  }

  resetRoomState() {
    this.state = roomState.SELECTING_WORD;
    this.word = null;
    this.timer.stop();
    this.answererCount = 0;
    this.players.forEach((player) => {
      player.privileged = false;
    });
  }

  prepareNextQuestion() {
    try {
      this.resetRoomState();
      this.examinerIndex -= 1;
      // 주의!!!
      this.players[this.examinerIndex].privileged = true;
    } catch (e) {
      console.log(e);
    }
  }

  prepareNextRound() {
    this.resetRoomState();
    this.examinerIndex = this.players.length - 1;
    this.players[this.examinerIndex].privileged = true;
    this.currentRound += 1;
  }

  addPlayer(user) {
    this.players.push(user);
    if (this.state === roomState.EMPTY) this.state = roomState.WAITING;
  }

  removePlayer(userIndex) {
    if (userIndex < 0) return;
    const [removedPlayer] = this.players.splice(userIndex, 1);
    if (this.players.length === 1) {
      this.state = roomState.WAITING;
    }
    // 출제자가 나간 경우 && 게임을 계속 할 수 잇는 경우 && 단어를 아직 선택하지 않은 경우
    if (removedPlayer.privileged && this.players.length) {
      if (userIndex === 0) {
        this.players[this.players.length - 1].privileged = true;
        this.examinerIndex = this.players.length - 1;
      } else {
        this.players[userIndex - 1].privileged = true;
        this.examinerIndex = userIndex - 1;
      }

      if (this.isWaiting()) return 1;
      if (this.isSelectingWord()) return 2;
      if (this.isPlayingQuestion()) return 3;
    }
  }

  // 방이 대기중인 상태인 경우
  isWaiting() {
    return this.state === roomState.WAITING && this.players.length < 2;
  }

  // 최소 시작 인원을 기다리다가 충족된 경우. 즉, 새 게임
  isPlayable() {
    return this.state === roomState.WAITING && this.players.length >= 2;
  }

  // 이미 게임이 시작했으며, 게임이 아직 종료되지 않은 경우. 즉, 난입
  isSelectingWord() {
    return this.state === roomState.SELECTING_WORD && this.players.length >= 2;
  }

  isPlayingQuestion() {
    return this.state === roomState.PLAYING_QUESTION && this.players.length >= 2;
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

  isLastRound() {
    return this.currentRound === this.totalRound;
  }

  isGameEnd() {
    return this.isLastRound() && this.examinerIndex === 0;
  }

  questionEndCallback(gameIo) {
    const answer = this.word;
    // 마지막 문제인 경우
    if (this.isGameEnd()) {
      this.gameEndCallback(gameIo);
      return;
    }
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
    setTimeout(() => {
      const userList = this.players.map((user) => {
        const userName = user.nickname || '부스트캠퍼';
        return {
          nickname: userName,
          socketId: user.socket.id,
          privileged: user.privileged,
          avatar: user.avatar,
        };
      });
      gameIo.in(this.roomId).emit('userList', { userList: JSON.stringify(userList) });
    }, 5000);
  }

  async gameEndCallback(gameIo) {
    gameIo.in(this.roomId).emit('endGame', {
      _scores: this.getScores(),
      answer: this.word,
    });

    function getPlayerByNickname(player) {
      return models.Users.findOne({
        where: {
          nickname: {
            [Op.eq]: player.nickname,
          },
        },
      });
    }

    function makeIdScoreTuple(acc, user, player) {
      acc.push({
        id: user.dataValues.id,
        score: user.dataValues.score + player.score,
      });

      return acc;
    }

    const users = await this.players.reduce(
      makeReducerWithPromise(getPlayerByNickname, makeIdScoreTuple),
      [],
    );

    function updateUserScore(user) {
      return models.Users.update(
        {
          score: user.score,
        },
        {
          where: {
            id: {
              [Op.eq]: user.id,
            },
          },
        },
      );
    }

    function makeUpdatedUserNumber(acc, updatedUser) {
      acc += updatedUser[0];
      return acc;
    }

    const updatedUserNumber = await users.reduce(
      makeReducerWithPromise(updateUserScore, makeUpdatedUserNumber),
      0,
    );

    console.log('updatedUserNumber', updatedUserNumber);
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

  makeGameStartData() {
    return {
      _painter: this.getExaminerSocketId(),
      currentRound: this.currentRound,
      totalRound: this.totalRound,
    };
  }

  makeStartQuestionData() {
    return {
      wordLength: this.word.length,
      openLetter: this.word[this.openIndex],
      openIndex: this.openIndex,
      _endTime: this.timer.endTime,
    };
  }

  passRoomOwnerToNext() {
    try {
      if (this.players.length > 0) {
        this.roomOwner = this.players[0].socket.id;
        this.players[0].roomOwner = true;
        this.players[0].socket.emit('roomOwner');
      }
    } catch (e) {
      console.log(e);
    }
  }

  checkAndEmitRoomOwner(socketId, gameSocket) {
    if (this.roomOwner === socketId) {
      setTimeout(() => {
        gameSocket.emit('roomOwner');
      }, 100);
    }
  }
}

module.exports = { Room };
