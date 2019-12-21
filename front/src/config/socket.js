const socketOptions = {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 20000,
  reconnectionAttempts: 5,
  timeout: 30000,
  transports: ['websocket'],
};

export default socketOptions;
