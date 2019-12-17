/* eslint no-param-reassign:0 */
import React, { useContext } from 'react';
import {
  NonPainterBoardStyle,
  CanvasStyle,
} from 'components/GamePlay/CanvasSection/DrawingPlayGround/NonPainterBoard/NonPainterBoard.style';
import NonPainterPen from 'components/GamePlay/CanvasSection/DrawingPlayGround/Tools/ToolType/NonPainterPen';
import useFabricCanvas from 'hooks/DrawingPlayGround/useFabricCanvas';
import useGameSocket from 'hooks/Socket/useGameSocket';

NonPainterBoard.propTypes = {
  size: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
};

NonPainterBoard.defaultProps = {
  size: {
    width: 500,
    height: 500,
  },
};

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

  useGameSocket('drawing', ({ eventList }) => {
    setCanvas(eventList);
  });
  return (
    <NonPainterBoardStyle>
      <CanvasStyle ref={attachFabricCanvas} />
    </NonPainterBoardStyle>
  );
}
