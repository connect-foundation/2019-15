import { useContext, useEffect } from 'react';
import GlobalContext from 'global.context';
import { onCanvasData, offCanvasData } from 'logics/socketLogic';

export default function useCanvasDataReceive(setCanvas) {
  const { gameSocket } = useContext(GlobalContext);

  useEffect(() => {
    onCanvasData(gameSocket, setCanvas);
    return () => {
      offCanvasData(gameSocket);
    };
  }, [gameSocket, setCanvas]);
}
