/* eslint no-param-reassign:0 */
import React, { useContext } from 'react';
import {
  NonPainterBoardStyle,
  CanvasStyle,
} from 'components/GamePlay/CanvasSection/DrawingPlayGround/NonPainterPlayGround/NonPainterBoard/NonPainterBoard.style';
import NonPainterPen from 'components/GamePlay/CanvasSection/DrawingPlayGround/PainterPlayGround/Tools/ToolType/NonPainterPen';
import useCanvasDataReceive from 'hooks/DrawingPlayGround/useCanvasDataReceive';
import useFabricCanvas from 'hooks/DrawingPlayGround/useFabricCanvas';
import DrawingPlayGroundContext from 'components/GamePlay/CanvasSection/DrawingPlayGround/DrawingPlayGround.context';

const pen = new NonPainterPen();

const jsonEventList = ['objectAdded', 'objectRemoved', 'objectsCleared'];

export default function NonPainterBoard() {
  const { canvasSize } = useContext(DrawingPlayGroundContext);
  const [fabricCanvas, attachFabricCanvas] = useFabricCanvas(canvasSize);

  const setCanvasFromJson = (data) => {
    fabricCanvas.loadFromJSON(data);
    fabricCanvas.forEachObject((obj) => {
      obj.selectable = false;
      obj.evented = false;
    });
  };

  const handleEvents = ({ pointer, event }) => {
    if (event === 'mouseDown') {
      pen.onMouseDown(pointer);
    } else if (event === 'mouseMove') {
      pen.onMouseMove(pointer);
    }
  };

  const setCanvas = (eventList) => {
    eventList.forEach((e) => {
      if (jsonEventList.includes(e.event)) {
        setCanvasFromJson(e.data);
        return;
      }

      pen.setCanvas(fabricCanvas, e.drawingOptions);
      handleEvents(e);
    });
  };

  useCanvasDataReceive(setCanvas);

  return (
    <NonPainterBoardStyle>
      <CanvasStyle ref={attachFabricCanvas} />
    </NonPainterBoardStyle>
  );
}
