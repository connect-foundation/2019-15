import { useEffect, useContext } from 'react';
import GlobalContext from 'global.context';
import { offRequestFriend, onRequestFriend } from 'logics/socketLogic/online';

export default function useAlarm(alarmListDispatch) {
  const { onlineSocket } = useContext(GlobalContext);

  useEffect(() => {
    if (onlineSocket) onRequestFriend(onlineSocket, alarmListDispatch);
    return () => {
      if (onlineSocket) offRequestFriend(onlineSocket);
    };
  }, [alarmListDispatch, onlineSocket]);
}
