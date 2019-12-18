import { useState, useCallback } from 'react';
import { fabric } from 'fabric';

export default function useFabricCanvas({ width, height }) {
  const [fabricCanvas, setFabricCanvas] = useState(null);

  const attachFabricCanvas = useCallback(
    (canvas) => {
      setFabricCanvas(
        new fabric.Canvas(canvas, {
          isDrawingMode: false,
          selection: false,
          width,
          height,
        }),
      );
    },
    [height, width],
  );

  return [fabricCanvas, attachFabricCanvas];
}
