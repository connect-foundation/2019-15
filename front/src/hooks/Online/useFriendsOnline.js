import { useEffect, useContext } from 'react';
import { offFriendsOnline, onFriendsOnline } from 'logics/socketLogic/online';
import GlobalContext from 'global.context';

export default function useFriendsOnline(onlineFriendsDispatch) {
  const { onlineSocket } = useContext(GlobalContext);

  useEffect(() => {
    if (onlineSocket) onFriendsOnline(onlineSocket, onlineFriendsDispatch);

    return () => {
      if (onlineSocket) offFriendsOnline(onlineSocket);
    };
  }, [onlineFriendsDispatch, onlineSocket]);
}
