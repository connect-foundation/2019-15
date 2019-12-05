import socketIo from 'socket.io-client';
import APP_URI from 'util/uri';

export const connectSocket = () => {
  return socketIo.connect(`${APP_URI.REACT_APP_API_URI}/online`);
};

export const onRequestFriend = (socket, { alarmListDispatch }) => {
  socket.on('requestFriend', (user) => {
    alarmListDispatch({
      type: 'push',
      value: `${user.nickname}님이 친구가 되고 싶어 해요`,
    });
  });
};

export const offRequestFriend = (socket) => {
  socket.off('requestFriend');
};

export const emitRequestFriend = (socket, { receiver }) => {
  socket.emit('requestFriend', {
    receiver,
  });
};
