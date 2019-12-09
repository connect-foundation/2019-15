import { useRef, useCallback } from 'react';
import { fabric } from 'fabric';

export default function useFabricCanvas({ width, height }) {
  const fabricCanvas = useRef(null);

  const setFabricCanvas = useCallback(
    (canvas) => {
      fabricCanvas.current = new fabric.Canvas(canvas, {
        isDrawingMode: false,
        selection: false,
        width,
        height,
      });
    },
    [height, width],
  );

  return [fabricCanvas, setFabricCanvas];
}
