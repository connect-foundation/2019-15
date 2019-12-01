const { RoomManager } = require('../Room');
const { sendUserListToRoom, personEnterRoom, personEnterSecretRoom } = require('./game');
const disconnect = require('./disconnect');
const getRandomInt = require('../../util/getRandomInt');

function setGameSocket(socket) {
  this.RoomManager = RoomManager;
  let userName;
  let roomInfo;
  this.socket = socket;
  const socketId = socket.id;

  RoomManager.roomList.forEach((roomName) => {
    socket.on(`enter${roomName}`, ({ nickname }) => {
      roomInfo = personEnterRoom(nickname, socket, roomName, this.gameIo);
      userName = nickname;
    });
  });

  socket.on('makeSecret', ({ nickname, roomId }) => {
    personEnterSecretRoom(nickname, socket, roomId, this.gameIo);
    userName = nickname;
    roomInfo = { roomId, roomType: '비밀방' };
  });

  socket.on('startSecretGame', ({ roomId, roomType }) => {
    const room = RoomManager.room[roomType][roomId];
    if (room.players.length >= 2) {
      this.gameIo.to(roomId).emit('startSecretGame', { painter: room.players[0].socket.id });
    }
  });

  socket.on('gameImage', ({ roomId, image }) => {
    socket.to(roomId).emit('gameImage', { image });
  });

  socket.on('exitRoom', ({ nickname, roomType, roomId }) => {
    const rooms = RoomManager.room;
    if (!roomType) return;

    const room = rooms[roomType];
    if (!roomId || !(roomId in room)) return;

    const userList = room[roomId].players;

    const exitUserIdx = userList.findIndex((user) => user.socket.id === socketId);
    userList.splice(exitUserIdx, 1);

    // 리뷰: 유저리스트를 다보내지 말고 제외된 유저 아이디만 보내자
    sendUserListToRoom(userList, roomId, this.gameIo);
  });

  socket.on('sendMessage', ({ socketId, roomType, roomId, inputValue }) => {
    let answer;
    try {
      answer = RoomManager.room[roomType][roomId].word;
    } catch {
      answer = null;
    }
    RoomManager.room[roomType][roomId].players.findIndex((user) => {
      if (user.socket.id === socketId) {
        if (inputValue === answer && !user.privileged) {
          user.privileged = true;
          this.gameIo.in(roomId).emit('getMessage', {
            content: `${user.nickname}님이 정답을 맞췄습니다! Hooray`,
            privileged: 'notice',
          });
        } else {
          this.gameIo.in(roomId).emit('getMessage', {
            content: `${user.nickname} : ${inputValue}`,
            privileged: user.privileged,
          });
        }
      }
    });
  });

  socket.on('selectWord', ({ answer, roomType, roomId }) => {
    const room = RoomManager.room[roomType][roomId];
    room.word = answer;
    // 서버 타이머 트리거
    room.timer.start();
    // 클라들에게 뿌려주기
    const openIndex = getRandomInt(0, answer.length);
    this.gameIo.in(roomId).emit('startQuestion', {
      wordLength: answer.length,
      openLetter: answer[openIndex],
      openIndex,
    });
  });

  // 출제자가 캔버스에 그림을 그리는 경우.
  socket.on('drawing', ({ roomId }) => {
    // 출제자를 제외한 참가자들에게 캔버스 정보를 전송
    this.gameIo.to(roomId).emit('drawing');
  });

  socket.on('disconnect', disconnect.bind(this));
}
module.exports = setGameSocket;
