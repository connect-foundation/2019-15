import socketIo from 'socket.io-client';

const io = {
  socket: null,
  async connectSocket() {
    this.socket = await socketIo.connect(
      `${process.env.REACT_APP_LOCAL_API_URI}`,
    );
  },
  async getSocket() {
    if (this.socket !== null) {
      return this.socket;
    }
    await this.connectSocket();
    return this.socket;
  },
  async initMsgHandler() {
    this.socket.on('connect_3명', ({ roomType, roomId }) => {
      this.socket.emit('get_userlist', { roomType, roomId });
    });
    this.socket.on('connect_6명', ({ roomType, roomId }) => {
      this.socket.emit('get_userlist', { roomType, roomId });
    });
    this.socket.on('connect_12명', ({ roomType, roomId }) => {
      this.socket.emit('get_userlist', { roomType, roomId });
    });
    this.socket.on('connect_100명', ({ roomType, roomId }) => {
      this.socket.emit('get_userlist', { roomType, roomId });
    });

    this.socket.on('userlist', ({ userlist }) => {
      console.log('userlist: ', JSON.parse(userlist));
    });
  },
};

export default io;
