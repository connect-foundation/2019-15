import socketIo from 'socket.io-client';
import Room from '../room';
import APP_URI from '../../util/uri';
import roomInfo from '../../constant/room/roomInfo';

const io = {
  socket: null,
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
};

export default io;
