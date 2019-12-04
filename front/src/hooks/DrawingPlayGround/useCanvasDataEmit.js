import { useContext, useCallback } from 'react';
import GlobalContext from 'global.context';

export default function useCanvasDataEmit() {
  const { io, room } = useContext(GlobalContext);

  const emitCanvasData = useCallback(
    (eventList) => {
      io.emitCanvasData({
        roomId: room.roomId,
        eventList,
      });
    },
    [io, room],
  );

  return emitCanvasData;
}
