import socketIo from 'socket.io-client';
import APP_URI from 'util/uri';
import Room from '../room';

export function connectGameSocket() {
  return socketIo.connect(`${APP_URI.REACT_APP_API_URI}/game`, {
    reconnectionAttempts: 5,
  });
}

export function initConnectMsgHandler(socket, { setRoom }) {
  socket.on(`connectRandom`, ({ roomType, roomId }) => {
    setRoom(new Room(roomId, roomType));
  });
}

export function initUserListMsgHandler(socket, { setUserList }) {
  socket.on('userList', ({ userList }) => {
    const parsedList = JSON.parse(userList);
    setUserList(parsedList);
  });
}

export function initGameStartMsgHandler(socket, { setPainter, setRound }) {
  socket.on('gamestart', ({ painter, currentRound, totalRound }) => {
    setPainter(painter);
    setRound({
      currentRound,
      totalRound,
    });
  });
}

export function initStartSecretGameHandler(
  socket,
  { setPainter, setIsGamePlaying },
) {
  socket.on('startSecretGame', ({ painter }) => {
    setPainter(painter);
    setIsGamePlaying(true);
  });
}

export function requestMakeSecretRoom(socket, { nickname, roomId }) {
  socket.emit('makeSecret', { nickname, roomId });
}

export function startSecretGame(socket, { roomId, roomType }) {
  socket.emit('startSecretGame', { roomId, roomType });
}

export function exitGameRoom(socket, { roomType, roomId }) {
  socket.emit('exitRoom', { roomType, roomId });
}

export function sendMessage(
  socket,
  { socketId, roomType, roomId, inputValue },
) {
  socket.emit('sendMessage', { socketId, roomType, roomId, inputValue });
}

export function initChattingHandler(socket, { setMessage }) {
  socket.on('getMessage', ({ content, privileged }) => {
    const splitRes = content.split(' : ');
    if (splitRes.length === 2 && splitRes[1] === '') return;
    setMessage({ content, privileged });
  });
}

export function selectWord(socket, { answer, roomType, roomId }) {
  socket.emit('selectWord', { answer, roomType, roomId });
}

export function setStartQuestionHandler(socket, setQuestionWord, callback) {
  socket.on('startQuestion', ({ wordLength, openLetter, openIndex }) => {
    setQuestionWord({ wordLength, openLetter, openIndex });
    callback();
  });
}

export function setEndQuestionHandler(socket, endQuestionCallback) {
  socket.on('endQuestion', endQuestionCallback);
}

export function onCanvasData(socket, setCanvas) {
  socket.on('drawing', ({ eventList }) => {
    setCanvas(eventList);
  });
}

export function offCanvasData(socket) {
  socket.off('drawing');
}

export function sendCanvasData(socket, { roomId, eventList }) {
  socket.emit('drawing', { roomId, eventList });
}

export function enterRandom(socket, { nickname, roomType }) {
  socket.emit('enterRandom', { nickname, roomType });
}

export function closeSocket(socket, { setGameSocket }) {
  if (!socket) return;
  socket.close();
  setGameSocket(null);
}
