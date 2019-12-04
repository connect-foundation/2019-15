import { useContext, useEffect } from 'react';
import GlobalContext from 'global.context';

export default function useCanvasDataReceive(setCanvas) {
  const { io } = useContext(GlobalContext);

  useEffect(() => {
    io.onCanvasData(setCanvas);
    return () => {
      io.offCanvasData();
    };
  }, [io, setCanvas]);
}
