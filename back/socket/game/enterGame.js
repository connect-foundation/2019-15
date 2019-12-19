const jwt = require('jsonwebtoken');
const User = require('../User');
const { WAIT_UNTIL_USER_ADD_EVENT } = require('../../config/roomConfig');
const jwtOptions = require('../../config/jwtOptions');
const parseCookies = require('../../util/cookie/parseCookies');

function enterRandom(gameSocket, roomInfo, { nickname, avatar, roomType }) {
  const room = this.RoomManager.getRoom(roomInfo);

  const { jwt: jwtToken } = parseCookies(gameSocket.handshake.headers.cookie);
  const { id } = jwt.verify(jwtToken, process.env.JWT_SECRET, {
    issuer: jwtOptions.issuer,
    subject: jwtOptions.subject,
  });

  room.addPlayer(new User(nickname, gameSocket, id, false, avatar));

  gameSocket.join(roomInfo.roomId);
  gameSocket.emit(`connectRandom`, roomInfo);

  if (room.isPlayable()) {
    room.prepareFirstQuestion();
    this.gameIo.to(roomInfo.roomId).emit('gamestart', room.makeGameStartData());
  } else if (room.isSelectingWord()) {
    gameSocket.emit('gamestart', room.makeGameStartData());
  } else if (room.isPlayingQuestion()) {
    gameSocket.emit('gamestart', room.makeGameStartData());
    gameSocket.emit('startQuestion', room.makeStartQuestionData());
  }
  room.sendUserList(this.gameIo);
}

function enterPrivate(gameSocket, roomInfo, { nickname, avatar }) {
  if (!roomInfo) return;

  const room = this.RoomManager.getRoom(roomInfo);
  if (!room) return;

  const { roomId } = roomInfo;
  let roomOwner = false;
  if (room.players.length === 0) {
    room.roomOwner = gameSocket.id;
    roomOwner = true;
  }

  room.addPlayer(new User(nickname, gameSocket, null, roomOwner, avatar));

  gameSocket.join(roomId);

  room.checkAndEmitRoomOwner(gameSocket.id, gameSocket);

  setTimeout(() => {
    room.sendUserList(this.gameIo);
  }, 0);

  if (room.isPlayingQuestion()) {
    setTimeout(() => {
      gameSocket.emit('movePrivate');
    }, 0);

    setTimeout(() => {
      room.sendUserList(this.gameIo);
      gameSocket.emit('gamestart', room.makeGameStartData());
      gameSocket.emit('startQuestion', room.makeStartQuestionData());
    }, WAIT_UNTIL_USER_ADD_EVENT);
  }
}

module.exports = { enterRandom, enterPrivate };
