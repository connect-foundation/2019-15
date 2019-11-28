import socketIo from 'socket.io-client';
import Room from '../room';
import APP_URI from '../../util/uri';
import roomInfo from '../../constant/room/roomInfo';

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
  async requestMakeSecretRoom({ nickname, roomId }) {
    this.socket.emit('makeSecret', { nickname, roomId });
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
  async selectWord({ answer, roomType, roomId }) {
    this.socket.emit('selectWord', { answer, roomType, roomId });
  },
  async setStartQuestionHandler(setQuestionWord, callback) {
    this.socket.on('startQuestion', ({ wordLength, openLetter, openIndex }) => {
      setQuestionWord({ wordLength, openLetter, openIndex });
      callback();
    });
  },
};

export default io;
