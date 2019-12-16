import { useContext, useEffect, useRef } from 'react';
import GlobalContext from 'global.context';

export default function useGameSocket(eventKey, callback) {
  const { gameSocket } = useContext(GlobalContext);

  useEffect(() => {
    if (!gameSocket) {
      return () => {};
    }
    if (eventKey) {
      gameSocket.on(eventKey, callback);
      return () => gameSocket.off(eventKey);
    }
  }, [callback, eventKey, gameSocket]);

  return gameSocket;
}
