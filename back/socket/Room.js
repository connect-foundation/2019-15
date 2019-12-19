const { Op } = require('sequelize');
const models = require('../db/models');
const { roomState, defaultRoomSetting, escapeResultCode } = require('../config/roomConfig');
const Timer = require('../util/timer/Timer');
const makeReducerWithPromise = require('../util/makeReducerWithPromise');
const { PRIVATE_ROOM_NAME } = require('../config/roomConfig');

class Room {
  constructor(gameIo, roomId, roomType) {
    this.roomId = roomId;
    this.roomType = roomType;
    this.players = [];
    this.categoryId = null;
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
    this.categoryId = null;
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

  sendUserList(gameIo) {
    const userList = this.players.map((user) => {
      const userName = user.nickname || '부스트캠퍼';
      return {
        nickname: userName,
        socketId: user.socket.id,
        privileged: user.privileged,
        avatar: user.avatar,
        roomOwner: user.roomOwner,
      };
    });
    gameIo.in(this.roomId).emit('userList', { playerList: JSON.stringify(userList) });
  }

  removePlayer(userIndex) {
    if (userIndex < 0) return;
    this.players.splice(userIndex, 1);

    if (this.players.length === 1) {
      this.state = roomState.WAITING;
    }
  }

  getRoomStateAfterRemovePlayer(userIndex) {
    // 게임을 계속 할 수 있는 경우
    if (this.players.length) {
      // 출제자가 탈주한 경우
      if (userIndex === this.examinerIndex) {
        const nextExaminerIndex = userIndex === 0 ? this.players.length - 1 : userIndex - 1;
        this.players[nextExaminerIndex].privileged = true;

        if (this.isSelectingWord()) this.examinerIndex = nextExaminerIndex;
        if (this.isPlayingQuestion()) return escapeResultCode.EXAMINER_IS_ESCAPED;
      }
      // 출제자가 아닌 플레이어가 탈주한 경우
      else {
        if (userIndex < this.examinerIndex) this.examinerIndex -= 1;

        if (this.isPlayingQuestion()) return escapeResultCode.NON_EXAMINER_IS_ESCAPED;
      }

      // 누가 나가던 상관없는 경우
      if (this.isWaiting()) return escapeResultCode.IS_WAITING;
      if (this.isSelectingWord()) return escapeResultCode.IS_SELECTING_WORD;
    }
    return escapeResultCode.NOT_PROPER;
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
      this.sendUserList(gameIo);
    }, 5000);
  }

  gameEndCallback(gameIo) {
    gameIo.in(this.roomId).emit('endGame', {
      _scores: this.getScores(),
      answer: this.word,
    });

    if (this.roomType !== PRIVATE_ROOM_NAME) this.updateUserScore();
  }

  async updateUserScore() {
    const getPlayerByNickname = (player) => {
      return models.Users.findOne({
        where: {
          nickname: {
            [Op.eq]: player.nickname,
          },
        },
      });
    };

    const makeIdScoreTuple = (acc, user, player) => {
      acc.push({
        id: user.dataValues.id,
        score: user.dataValues.score + player.score,
      });

      return acc;
    };

    const users = await this.players.reduce(
      makeReducerWithPromise(getPlayerByNickname, makeIdScoreTuple),
      [],
    );

    const updateUserScore = (user) => {
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
    };

    const makeUpdatedUserNumber = (acc, updatedUser) => {
      acc += updatedUser[0];
      return acc;
    };

    await users.reduce(makeReducerWithPromise(updateUserScore, makeUpdatedUserNumber), 0);
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

  resetAllPlayerPrivilege() {
    this.players = this.players.map((player) => {
      player.privileged = false;
      return player;
    });
  }

  roomSettingAfterUserRemove(removeResult, gameSocket) {
    switch (removeResult) {
      case escapeResultCode.IS_WAITING: {
        this.timer.stop();
        this.resetAllPlayerPrivilege();
        gameSocket.to(this.roomId).emit('prepareNewGame');
        break;
      }
      case escapeResultCode.IS_SELECTING_WORD: {
        gameSocket.to(this.roomId).emit('gamestart', this.makeGameStartData());
        break;
      }
      case escapeResultCode.EXAMINER_IS_ESCAPED: {
        this.questionEndCallback(gameSocket);
        break;
      }
      case escapeResultCode.NON_EXAMINER_IS_ESCAPED: {
        if (this.isAllPlayerAnswered()) this.questionEndCallback(gameSocket);
        break;
      }
      default: {
        break;
      }
    }
  }
}

module.exports = { Room };
