/* eslint no-param-reassign:0 */
import React from 'react';
import PropTypes from 'prop-types';
import {
  NonPainterBoardStyle,
  CanvasStyle,
} from 'components/GamePlay/CanvasSection/DrawingPlayGround/NonPainterBoard/NonPainterBoard.style';
import NonPainterPen from 'components/GamePlay/CanvasSection/DrawingPlayGround/Tools/ToolType/NonPainterPen';
import useCanvasDataReceive from 'hooks/DrawingPlayGround/useCanvasDataReceive';
import useFabricCanvas from 'hooks/DrawingPlayGround/useFabricCanvas';

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

export default function NonPainterBoard({ size }) {
  const { width, height } = size;
  const [fabricCanvas, setFabricCanvas] = useFabricCanvas(size);

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
      <CanvasStyle ref={setFabricCanvas} style={{ width, height }} />
    </NonPainterBoardStyle>
  );
}
