import socketIo from 'socket.io-client';
import Room from '../room';
import APP_URI from '../../util/uri';
import roomInfo from '../../constant/room/roomInfo';

const io = {
  socket: null,
  async sendMessage({ socketId, roomType, roomId, inputValue }) {
    this.socket.emit('sendMessage', { socketId, roomType, roomId, inputValue });
  },
};

export default io;
