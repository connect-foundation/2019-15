import socketIo from "socket.io-client";
import Room from "../room";
import APP_URI from "../../util/uri";
import roomInfo from "../room/roomInfo";

// 자신의 소켓을 가지고 있기 위한 객체입니다.
const io = {
  socket: null,
  async connectSocket() {
    this.socket = await socketIo.connect(`${APP_URI.REACT_APP_API_URI}`);
  },
  async getSocket() {
    if (this.socket !== null) {
      return this.socket;
    }
    await this.connectSocket();
    return this.socket;
  },
  // 게임방 연결 성공에 대한 메세지 핸들러입니다.
  // 방정보를 받고 컨텍스트로 가지고 있습니다.
  // 방정보의 유무에 따라 게임중인지 아닌지를 판단합니다.
  async initConnectMsgHandler({ setRoom }) {
    roomInfo.roomList.forEach(roomName => {
      this.socket.on(`connect_${roomName}`, ({ roomType, roomId }) => {
        setRoom(Room(roomType, roomId));
      });
    });
  },
  // 이벤트등록함수를 하나에 넣지 않고 분리함으로서
  // 해당 이벤트가 등록되어야 할 곳에서 호출하여 등록되도록 하였습니다.
  // 단점으로는 컴포넌트가 그려질때마다 이벤트를 등록하는 함수가 호출되어
  // 비효율적인것 같지만 코드를 깔끔하게 유지하기 위해 이렇게 하였습니다.
  async initUserlistMsgHandler({ setUserlist }) {
    this.socket.on("userlist", ({ userlist }) => {
      const parsedList = JSON.parse(userlist);
      setUserlist(parsedList);
    });
  },
  // 게임시작 메세지가 오면 문제 제출자를 설정합니다.
  async initGameStartMsgHandler({ setPainter }) {
    this.socket.on("gamestart", ({ painter }) => {
      setPainter(painter);
    });
  }
};

export default io;
