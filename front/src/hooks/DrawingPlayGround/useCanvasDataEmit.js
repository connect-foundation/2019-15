import { useContext, useCallback } from 'react';
import GlobalContext from 'global.context';

export default function useCanvasDataEmit() {
  const { gameSocket, room } = useContext(GlobalContext);

  const emitCanvasData = useCallback(
    (eventList) => {
      gameSocket.emit('drawing', { roomId: room.roomId, eventList });
    },
    [gameSocket, room],
  );

  return emitCanvasData;
}
