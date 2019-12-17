import socketIo from 'socket.io-client';
import APP_URI from 'util/uri';

export const connectSocket = () => {
  return socketIo.connect(`${APP_URI.REACT_APP_API_URI}/online`, {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 20000,
    reconnectionAttempts: 5,
  });
};

export const onAlarm = (socket, addFriendRequestAlarm) => {
  socket.on('alarm', (message) => {
    addFriendRequestAlarm(message);
  });
};

export const offAlarm = (socket) => {
  socket.off('alarm');
};


export const onFriendsOnline = (socket, onlineFriendsDispatch) => {
  socket.on('friendsOnline', (friends) => {
    onlineFriendsDispatch({ type: 'add', value: friends });
  });
};

export const offFriendsOnline = (socket) => {
  socket.off('friendsOnline');
};

export const onFriendOffline = (socket, onlineFriendsDispatch) => {
  socket.on('friendOffline', (friend) => {
    onlineFriendsDispatch({ type: 'delete', value: friend });
  });
};

export const offFriendOffline = (socket) => {
  socket.off('friendOffline');
};

