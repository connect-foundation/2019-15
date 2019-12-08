import { useEffect, useContext, useReducer } from 'react';
import {
  onFriendOffline,
  offFriendOffline,
  onFriendsOnline,
  offFriendsOnline,
} from 'logics/socketLogic/online';
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

export default function useOnlineFriends() {
  const { onlineSocket } = useContext(GlobalContext);
  const [onlineFriends, onlineFriendsDispatch] = useReducer(
    friendsOnlineReducer,
    {},
  );

  useEffect(() => {
    if (onlineSocket) {
      onFriendsOnline(onlineSocket, onlineFriendsDispatch);
      onFriendOffline(onlineSocket, onlineFriendsDispatch);
    }

    return () => {
      if (onlineSocket) {
        offFriendsOnline(onlineSocket);
        offFriendOffline(onlineSocket);
      }
    };
  }, [onlineFriendsDispatch, onlineSocket]);

  return [onlineFriends, onlineFriendsDispatch];
}
