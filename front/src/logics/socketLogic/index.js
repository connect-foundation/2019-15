import socketIo from 'socket.io-client';
import APP_URI from 'util/uri';
import roomInfo from 'constant/room/roomInfo';
import Room from '../room';

const io = {
  socket: null,

  async connectSocket() {
    this.socket = await socketIo.connect(`${APP_URI.REACT_APP_API_URI}/game`);
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
  async sendMessage({ socketId, roomType, roomId, inputValue }) {
    this.socket.emit('sendMessage', { socketId, roomType, roomId, inputValue });
  },
  async initChattingHandler({ messages, pushMessage }) {
    this.socket.on('getMessage', ({ content, privileged }) => {
      const splitRes = content.split(' : ');
      if (splitRes.length === 2 && splitRes[1] === '') return;
      messages.push({ content, privileged });
      pushMessage(messages.slice());
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

  async initImageSendHandler({ setCanvasImage }) {
    this.socket.on('drawing', ({ image }) => {
      setCanvasImage({ image });
    });
  },

  async sendImage({ roomId, image }) {
    await this.socket.emit('drawing', { roomId, image });
  },
};

export default io;
