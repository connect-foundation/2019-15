import { useContext, useEffect } from 'react';
import GlobalContext from 'global.context';

export default function useGameSocket(eventKey, callback) {
  const { gameSocket } = useContext(GlobalContext);

  useEffect(() => {
    if (!gameSocket || !eventKey) {
      return () => {};
    }
    gameSocket.on(eventKey, callback);
    return () => gameSocket.off(eventKey);
  }, [callback, eventKey, gameSocket]);

  return gameSocket;
}
