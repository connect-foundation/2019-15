import socketIo from 'socket.io-client';
import APP_URI from 'util/uri';

export const connectSocket = () => {
  return socketIo.connect(`${APP_URI.REACT_APP_API_URI}/online`);
};

export const onRequestFriend = (socket, { alarmListDispatch }) => {
  socket.on('requestFriend', (user) => {
    alarmListDispatch({
      type: 'push',
      value: `${user.nickname}님이 친구 신청하였습니다.`,
    });
    setTimeout(() => {
      alarmListDispatch({ type: 'pop' });
    }, 10000);
  });
};

export const offRequestFriend = (socket) => {
  socket.off('requestFriend');
};

export const emitRequestFriend = (socket, { sender, receiver }) => {
  socket.emit('requestFriend', {
    sender,
    receiver,
  });
};
