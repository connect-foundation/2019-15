import socketIo from 'socket.io-client';
import Room from '../room';
import APP_URI from '../../util/uri';
import roomInfo from '../room/roomInfo';

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
  async initConnectMsgHandler({ setRoom }) {
    roomInfo.roomList.forEach((roomName) => {
      this.socket.on(`connect_${roomName}`, ({ roomType, roomId }) => {
        setRoom(Room(roomType, roomId));
      });
    });
  },
  async initUserlistMsgHandler({ setUserlist }) {
    this.socket.on('userlist', ({ userlist }) => {
      const parsedList = JSON.parse(userlist);
      setUserlist(parsedList);
    });
  },
  async initGameStartMsgHandler({ setPainter }) {
    this.socket.on('gamestart', ({ painter }) => {
      setPainter(painter);
    });
  },
  async exitGameRoom({ nickname, roomType }) {
    this.socket.emit('exit_room', { nickname, roomType });
  },
};

export default io;
