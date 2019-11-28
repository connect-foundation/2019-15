import socketIo from 'socket.io-client';
import APP_URI from '../../util/uri';

export const connectSocket = () => {
  return socketIo.connect(`${APP_URI.REACT_APP_API_URI}/online`);
};

export const onRequestFriend = async (
  socket,
  { setAlarmList, setNoticeType },
) => {
  socket.on('requestFriend', (user) => {
    setAlarmList({
      type: 'push',
      value: `${user.nickname}님이 친구 신청하였습니다.`,
    });
    setNoticeType('alarm');
    setTimeout(() => {
      setAlarmList({ type: 'pop' });
      setNoticeType(null);
    }, 2000);
  });
};

export const emitRequestFriend = (socket, { sender, receiver }) => {
  socket.emit('requestFriend', {
    sender,
    receiver,
  });
};
