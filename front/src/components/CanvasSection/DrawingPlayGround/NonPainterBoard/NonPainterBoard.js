/* eslint no-param-reassign:0 */
import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { fabric } from 'fabric';
import {
  NonPainterBoardStyle,
  CanvasStyle,
} from 'components/CanvasSection/DrawingPlayGround/NonPainterBoard/NonPainterBoard.style';
import NonPainterPen from 'components/CanvasSection/DrawingPlayGround/Tools/ToolType/NonPainterPen';
import useCanvasDataReceive from 'hooks/DrawingPlayGround/useCanvasDataReceive';

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
  const canvas = useRef(null);
  const ctx = useRef(null);
  const fabricCanvas = useRef(null);

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
    } else if (event === 'mouseOut') {
      pen.onMouseOut();
    }
  };

  const setCanvas = useCallback(
    (eventList) => {
      eventList.forEach((e) => {
        if (e.drawingOptions.tool !== 'pen') {
          setCanvasFromJson(e.data);
          return;
        }

        pen.setCanvas(fabricCanvas.current, e.drawingOptions);
        handleEvents(e);
      });
    },
    [handleEvents],
  );

  useCanvasDataReceive(setCanvas);

  useEffect(() => {
    ctx.current = canvas.current.getContext('2d');
    fabricCanvas.current = new fabric.Canvas(canvas.current, {
      isDrawingMode: false,
      width,
      height,
    });
  }, [canvas, height, width]);

  return (
    <NonPainterBoardStyle>
      <CanvasStyle ref={canvas} style={{ width, height }} />
    </NonPainterBoardStyle>
  );
}
