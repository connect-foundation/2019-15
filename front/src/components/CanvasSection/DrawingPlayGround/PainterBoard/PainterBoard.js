import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { fabric } from 'fabric';
import {
  PainterBoardStyle,
  CanvasStyle,
} from 'components/CanvasSection/DrawingPlayGround/PainterBoard/PainterBoard.style';
import ToolManager from 'components/CanvasSection/DrawingPlayGround/Tools/ToolType/ToolManager';
import useCanvasDataCaching from 'hooks/DrawingPlayGround/useCanvasDataCaching';

PainterBoard.propTypes = {
  drawingOptions: PropTypes.shape({
    tool: PropTypes.oneOf(ToolManager.TOOL_LIST),
    strokeColor: PropTypes.string,
  }),
  size: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
};

PainterBoard.defaultProps = {
  drawingOptions: PropTypes.shape({
    tool: ToolManager.TOOL_LIST[0],
    strokeColor: '#000000',
  }),
  size: {
    width: 500,
    height: 500,
  },
};

export default function PainterBoard({ drawingOptions, size }) {
  const { tool: toolName } = drawingOptions;
  const { width, height } = size;
  const canvas = useRef(null);
  const fabricCanvas = useRef(null);
  const emitable = useRef(false);

  useEffect(() => {
    fabricCanvas.current = new fabric.Canvas(canvas.current, {
      isDrawingMode: false,
      selection: false,
      width,
      height,
    });
  }, [height, width]);

  const eventListDispatch = useCanvasDataCaching();

  useEffect(() => {
    const tool = ToolManager[toolName];
    tool.setCanvas(fabricCanvas.current, drawingOptions);

    const setCanvasEvents = () => {
      fabricCanvas.current.on('mouse:down', ({ pointer }) => {
        tool.onMouseDown(pointer);
        if (toolName !== 'pen') return;
        emitable.current = true;
        eventListDispatch({
          type: 'push',
          value: { drawingOptions, pointer, event: 'mouseDown' },
        });
      });
      fabricCanvas.current.on('mouse:move', ({ pointer }) => {
        tool.onMouseMove(pointer);
        if (toolName !== 'pen' || !emitable.current) return;
        eventListDispatch({
          type: 'push',
          value: { drawingOptions, pointer, event: 'mouseMove' },
        });
      });
      fabricCanvas.current.on('mouse:up', ({ pointer }) => {
        tool.onMouseUp(pointer);
        eventListDispatch({
          type: 'push',
          value: {
            drawingOptions,
            data: fabricCanvas.current.toJSON(),
            event: 'mouseUp',
          },
        });
        emitable.current = false;
      });
      fabricCanvas.current.on('mouse:out', () => {
        tool.onMouseOut();
        if (toolName !== 'pen') return;
        eventListDispatch({
          type: 'push',
          value: {
            drawingOptions,
            pointer: { x: null, y: null },
            event: 'mouseOut',
          },
        });
        emitable.current = false;
      });
    };

    const removeCanvasEvents = () => {
      fabricCanvas.current.off('mouse:down');
      fabricCanvas.current.off('mouse:move');
      fabricCanvas.current.off('mouse:up');
      fabricCanvas.current.off('mouse:out');
    };

    setCanvasEvents();
    return removeCanvasEvents;
  }, [drawingOptions, eventListDispatch, toolName]);

  return (
    <PainterBoardStyle>
      <CanvasStyle ref={canvas} style={{ width, height }} />
    </PainterBoardStyle>
  );
}
