import { useContext, useCallback } from 'react';
import GlobalContext from 'global.context';
import { sendCanvasData } from 'logics/socketLogic';

export default function useCanvasDataEmit() {
  const { gameSocket, room } = useContext(GlobalContext);

  const emitCanvasData = useCallback(
    (eventList) => {
      sendCanvasData(gameSocket, {
        roomId: room.roomId,
        eventList,
      });
    },
    [gameSocket, room.roomId],
  );

  return emitCanvasData;
}
