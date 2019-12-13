const { personEnterRoom, sendUserListToRoom } = require("./game");
const { PRIVATE_ROOM_NAME } = require("../../config/roomConfig");
const User = require("../User");

function enterRandom(gameSocket, roomInfo, { nickname, roomType, avatar }) {
  personEnterRoom(
    nickname,
    gameSocket,
    roomType,
    this.gameIo,
    roomInfo.roomId,
    avatar
  );
}

/* 
아래는 사용자가 비밀방에 입장했을 때를 처리하는 함수입니다.
여기도 많은 로직이 있습니다.
고민되는 부분이
서버와 클라이언트의 결합도가 높다는 점입니다.
프론트가 서버에 너무 많이 의존하고 서버가 클라이언트에 관여를 너무 많이 합니다.
테스트가 어려워지고 수정이 어려워지고 있는데
"소켓을 사용하니까 어쩔 수 없지" 이런 생각으로 코딩을 하고 있는중입니다.
백이 http 응답을 하는 경우는 로그인, 디비쿼리를 빼고는 없고 모든 통신을 소켓 이벤트를 사용합니다.
안좋은 구조일까요?
*/
function enterPrivate(gameSocket, { nickname, roomId, avatar }) {
  const room = this.RoomManager.room[PRIVATE_ROOM_NAME][roomId];
  if (!room) return;

  let roomOwner = false;
  if (room.players.length === 0) {
    room.roomOwner = gameSocket.id;
    roomOwner = true;
  }

  room.addPlayer(new User(nickname, gameSocket, null, roomOwner, avatar));

  gameSocket.join(roomId);

  room.checkAndEmitRoomOwner(gameSocket.id, gameSocket);
  setTimeout(() => {
    sendUserListToRoom(room.players, roomId, this.gameIo);
  }, 0);

  if (room.isPlayingQuestion()) {
    setTimeout(() => {
      gameSocket.emit("movePrivate");
    }, 100);

    setTimeout(() => {
      sendUserListToRoom(room.players, roomId, this.gameIo);

      gameSocket.emit("gamestart", room.makeGameStartData());
      gameSocket.emit("startQuestion", room.makeStartQuestionData());
    }, 1000);
  }
}

module.exports = { enterRandom, enterPrivate };
