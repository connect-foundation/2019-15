import { useEffect, useContext } from 'react';
import { onFriendOffline, offFriendOffline } from 'logics/socketLogic/online';
import GlobalContext from 'global.context';

export default function useFriendsOffline(onlineFriendsDispatch) {
  const { onlineSocket } = useContext(GlobalContext);

  useEffect(() => {
    if (onlineSocket) onFriendOffline(onlineSocket, onlineFriendsDispatch);

    return () => {
      if (onlineSocket) offFriendOffline(onlineSocket);
    };
  }, [onlineFriendsDispatch, onlineSocket]);
}
