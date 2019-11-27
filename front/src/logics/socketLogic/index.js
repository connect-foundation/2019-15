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
        setRoom(new Room(roomId, roomType));
      });
    });
  },

  async initUserListMsgHandler({ setUserList }) {
    this.socket.on('userList', ({ userList }) => {
      const parsedList = JSON.parse(userList);
      setUserList(parsedList);
    });
  },

  async initGameStartMsgHandler({ setPainter }) {
    this.socket.on('gamestart', ({ painter }) => {
      setPainter(painter);
    });
  },

  async initStartSecretGameHandler({ setPainter, setIsGamePlaying }) {
    this.socket.on('startSecretGame', ({ painter }) => {
      setPainter(painter);
      setIsGamePlaying(true);
    });
  },

  async requestMakeSecretRoom({ nickname, roomId }) {
    this.socket.emit('make_secret', { nickname, roomId });
  },

  async startSecretGame({ roomId, roomType }) {
    this.socket.emit('startSecretGame', { roomId, roomType });
  },

  async exitGameRoom({ nickname, roomType, roomId }) {
    this.socket.emit('exit_room', { nickname, roomType, roomId });
  },
};

export default io;
