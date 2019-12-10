import socketIo from 'socket.io-client';
import APP_URI from '../../util/uri';
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

export function initGameStartMsgHandler(
  socket,
  { setPainter, setRound, setEndTime },
) {
  socket.on('gamestart', ({ painter, currentRound, totalRound, endTime }) => {
    setPainter(painter);
    setRound({
      currentRound,
      totalRound,
    });
    setEndTime(endTime);
  });
}

export function initStartPrivateGameHandler(socket, { setPainter }) {
  socket.on('startPrivateGame', ({ painter }) => {
    setPainter(painter);
  });
}

export function emitMakePrivateRoom(socket, { nickname, roomId }) {
  socket.emit('makePrivate', { nickname, roomId });
}

export function startPrivateGame(socket, { roomId, roomType }) {
  socket.emit('startPrivateGame', { roomId, roomType });
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

export function setStartQuestionHandler(
  socket,
  setQuestionWord,
  setEndTime,
  callback,
) {
  socket.on(
    'startQuestion',
    ({ wordLength, openLetter, openIndex, endTime }) => {
      setQuestionWord({ wordLength, openLetter, openIndex });
      setEndTime(endTime);
      callback();
    },
  );
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
