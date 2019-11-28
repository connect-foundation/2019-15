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
      this.socket.on(`connect${roomName}`, ({ roomType, roomId }) => {
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
    this.socket.emit('makeSecret', { nickname, roomId });
  },

  async startSecretGame({ roomId, roomType }) {
    this.socket.emit('startSecretGame', { roomId, roomType });
  },

  async exitGameRoom({ nickname, roomType, roomId }) {
    this.socket.emit('exitRoom', { nickname, roomType, roomId });
  },
  async sendMessage({ nickname, roomId, inputValue }) {
    this.socket.emit('sendMessage', { nickname, roomId, inputValue });
  },
  async initChattingHandler({ setMessage }) {
    this.socket.on('getMessage', ({ message }) => {
      setMessage(message);
    });
  },
  async questionStart({ answer, roomType, roomId }) {
    this.socket.emit('questionStart', { answer, roomType, roomId });
  },
};

export default io;
