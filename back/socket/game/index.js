const { RoomManager } = require("../Room");
const { personEnterSecretRoom, sendUserListToRoom } = require("./game");
const exitRoom = require("./exitRoom");
const sendGameImage = require("./gameImage");
const enterRandom = require("./enterRandom");
const { sendMessage } = require("./message");
const selectWord = require("./selectWord");

/* 
review: 리팩토링을 위해 맨 아래처럼 함수에 io, gamesocket, roomInfo 등을 bind 하고 있습니다.
이렇게 했더니 this 로 선언된 변수들은 bind 해도 모든 소켓이 공유하게 되고
const/let 으로 선언된 변수들은 bind하게 되면 그 이후로도 내부에서만 변경되고 외부 변수에는 영향이 없습니다
Pointer 를 넘기는게 아니라 shallow copy 후 종속된다고 느껴지는데 원래 이게 맞나요?
종속시키지 않고 pointer를 넘기는 방법이 궁금합니다.
*/

/* 
문제는 enterRandom 이벤트와 disconnect 이벤트 인데 방에 입장한 유저를 배열로 관리하기 때문에 
gameSocket 을 클로저로 다루는 방법이 필요합니다.
이는 바인드된 함수에서 사용할 수 있는 방법이 없어보입니다.
*/
function setGameSocket(socket) {
  this.RoomManager = RoomManager;
  const roomInfo = {};
  const gameSocket = socket;

  socket.on("enterRandom", ({ nickname, roomType }) => {
    roomInfo.roomType = roomType;
    roomInfo.roomId = RoomManager.getEnableRoomId(roomType, this.gameIo);
  });

  socket.on("makePrivateRoom", ({ nickname, roomId }) => {
    personEnterSecretRoom(nickname, gameSocket, roomId, this.gameIo);
    roomInfo.roomId = roomId;
    roomInfo.roomType = "비밀방";
  });

  socket.on("startPrivateGame", ({ roomId, roomType }) => {
    // 난입 시나리오 추가해야됨
    const room = RoomManager.room[roomType][roomId];
    if (room.isPlayable()) {
      this.gameIo.to(roomId).emit("startPrivateGame", {
        painter: room.players[room.players.length - 1].socket.id
      });
    }
  });

  socket.on("selectWord", selectWord.bind(this, gameSocket));
  socket.on("sendMessage", sendMessage.bind(this, gameSocket));
  socket.on("enterRandom", enterRandom.bind(this, gameSocket, roomInfo));
  socket.on("drawing", sendGameImage.bind(this, gameSocket));
  socket.on("exitRoom", exitRoom.bind(this, gameSocket));
  socket.on("disconnect", () => {
    if (!roomInfo) return;
    if (!RoomManager.isExistRoom(roomInfo)) return;

    const { roomType, roomId } = roomInfo;
    const room = RoomManager.room[roomType][roomId];
    const userIdx = room.getUserIndexBySocketId(gameSocket);
    if (userIdx >= 0) {
      room.removePlayer(userIdx);
      sendUserListToRoom(room.players, roomId, this.gameIo);
      gameSocket.leave();
    }
  });
}

module.exports = setGameSocket;
