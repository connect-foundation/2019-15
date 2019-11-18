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
    this.socket.on('connect_3명', (data) => {
      console.log(data);
    });
    this.socket.on('connect_6명', (data) => {
      console.log(data);
    });
    this.socket.on('connect_12명', (data) => {
      console.log(data);
    });
    this.socket.on('connect_100명', (data) => {
      console.log(data);
    });
  },
};

export default io;
