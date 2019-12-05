import socketIo from 'socket.io-client';
import APP_URI from 'util/uri';
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
    this.socket.on(`connectRandom`, ({ roomType, roomId }) => {
      setRoom(new Room(roomId, roomType));
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

  async exitGameRoom({ roomType, roomId }) {
    this.socket.emit('exitRoom', { roomType, roomId });
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
  setStartQuestionHandler(setQuestionWord, callback) {
    this.socket.on('startQuestion', ({ wordLength, openLetter, openIndex }) => {
      setQuestionWord({ wordLength, openLetter, openIndex });
      callback();
    });
  },
  setEndQuestionHandler(setShowQuestionResult, setScores, setSelectedWord) {
    this.socket.on('endQuestion', ({ nickname, scores, answer }) => {
      // 결과 화면 띄우기
      setSelectedWord(answer);
      setScores(scores);
      setShowQuestionResult(true);
      setTimeout(() => setShowQuestionResult(false), 3000);
      // 단어 선택 창 띄우기
      // 각종 상태 초기화하기
    });
  },
  onCanvasData(setCanvas) {
    this.socket.on('drawing', ({ eventList }) => {
      setCanvas(eventList);
    });
  },

  offCanvasData() {
    this.socket.off('drawing');
  },

  emitCanvasData({ roomId, eventList }) {
    this.socket.emit('drawing', { roomId, eventList });
  },
};

export default io;
