import socketIo from 'socket.io-client';
import APP_URI from '../../util/uri';

export function connectGameSocket() {
  return socketIo.connect(`${APP_URI.REACT_APP_API_URI}/game`, {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 20000,
    reconnectionAttempts: 5,
  });
}
// on-off

export function exitGameRoom(socket, { roomType, roomId }) {
  socket.emit('exitRoom', { roomType, roomId });
}

export function sendCanvasData(socket, { roomId, eventList }) {
  socket.emit('drawing', { roomId, eventList });
}

export function enterRandom(socket, { nickname, roomType, avatar }) {
  socket.emit('enterRandom', { nickname, roomType, avatar });
}

export function selectWord(socket, { answer, roomType, roomId }) {
  socket.emit('selectWord', { answer, roomType, roomId });
}

export function emitMakePrivateRoom(socket, { nickname, roomId }) {
  socket.emit('makePrivate', { nickname, roomId });
}

export function emitEnterPrivateRoom(socket, { nickname, roomId, avatar }) {
  socket.emit('enterPrivate', { nickname, roomId, avatar });
}

export function sendMessage(
  socket,
  { socketId, roomType, roomId, inputValue },
) {
  socket.emit('sendMessage', { socketId, roomType, roomId, inputValue });
}
