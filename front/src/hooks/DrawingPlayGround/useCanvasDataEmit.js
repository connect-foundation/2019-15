import { useContext, useCallback } from 'react';
import GlobalContext from 'global.context';

export default function useCanvasDataEmit() {
  const { gameSocket } = useContext(GlobalContext);

  const emitCanvasData = useCallback(
    (eventList) => {
      gameSocket.emit('drawing', { eventList });
    },
    [gameSocket],
  );

  return emitCanvasData;
}
