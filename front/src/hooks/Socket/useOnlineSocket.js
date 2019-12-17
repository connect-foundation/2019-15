import { useContext, useEffect } from 'react';
import GlobalContext from 'global.context';

export default function useOnlineSocket(eventKey, callback) {
  const { onlineSocket } = useContext(GlobalContext);

  useEffect(() => {
    if (!onlineSocket || !eventKey) {
      return () => {};
    }
    onlineSocket.on(eventKey, callback);
    return () => onlineSocket.off(eventKey);
  }, [callback, eventKey, onlineSocket]);

  return onlineSocket;
}
