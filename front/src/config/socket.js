const socketOptions = {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 20000,
  reconnectionAttempts: 5,
  transports: ['websocket'],
};

export default socketOptions;
