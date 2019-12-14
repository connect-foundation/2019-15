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

export default function NonPainterBoard() {
  const { canvasSize } = useContext(DrawingPlayGroundContext);
  const [fabricCanvas, setFabricCanvas] = useFabricCanvas(canvasSize);

  const setCanvasFromJson = (data) => {
    fabricCanvas.current.loadFromJSON(data);
    fabricCanvas.current.forEachObject((obj) => {
      obj.selectable = false;
      obj.evented = false;
    });
  };

  const handleEvents = ({ pointer, event, data }) => {
    if (event === 'mouseDown') {
      pen.onMouseDown(pointer);
    } else if (event === 'mouseMove') {
      pen.onMouseMove(pointer);
    } else if (event === 'mouseUp') {
      setCanvasFromJson(data);
      pen.onMouseUp();
    }
  };

  const setCanvas = (eventList) => {
    eventList.forEach((e) => {
      if (e.drawingOptions.tool !== 'pen') {
        setCanvasFromJson(e.data);
        return;
      }

      pen.setCanvas(fabricCanvas.current, e.drawingOptions);
      handleEvents(e);
    });
  };

  useCanvasDataReceive(setCanvas);

  return (
    <NonPainterBoardStyle>
      <CanvasStyle ref={setFabricCanvas} />
    </NonPainterBoardStyle>
  );
}
