import { useEffect, useContext, useReducer } from 'react';
import useOnlineSocket from 'hooks/Socket/useOnlineSocket';
import GlobalContext from 'global.context';

const friendsOnlineReducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return { ...state, ...action.value };
    case 'delete':
      return { ...state, [action.value.id]: null };
    default:
      throw new Error('wrong action type');
  }
};

export default function useOnlineFriends(friends) {
  const { onlineSocket } = useContext(GlobalContext);

  const [onlineFriends, dispatchOnlineFriends] = useReducer(
    friendsOnlineReducer,
    {},
  );

  useEffect(() => {
    onlineSocket.emit('checkFriendsOnline', friends);
  }, [friends, onlineSocket]);

  useOnlineSocket('offlineFriend', (friend) => {
    dispatchOnlineFriends({ type: 'delete', value: friend });
  });
  useOnlineSocket('checkFriendsOnline', (newOnlineFriends) => {
    dispatchOnlineFriends({ type: 'add', value: newOnlineFriends });
  });
  return [onlineFriends, dispatchOnlineFriends];
}
