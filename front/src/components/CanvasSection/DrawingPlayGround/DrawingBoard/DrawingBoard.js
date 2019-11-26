import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { fabric } from 'fabric';
import { DrawingBoardStyle, CanvasStyle } from './DrawingBoard.style';
import Tool from '../Tools/ToolType/Tool';

const DrawingBoard = ({ drawingOptions, size }) => {
  const { tool } = drawingOptions;
  const { width, height } = size;
  const canvas = useRef(null);
  const fabricCanvas = useRef(null);

  useEffect(() => {
    fabricCanvas.current = new fabric.Canvas(canvas.current, {
      isDrawingMode: true,
      width,
      height,
    });
  }, [canvas, height, width]);

  useEffect(() => {
    tool.setCanvas(fabricCanvas.current, drawingOptions);
    fabricCanvas.current.on('mouse:down', (e) => {
      tool.onMouseDown(e);
    });
    fabricCanvas.current.on('mouse:move', (e) => {
      tool.onMouseMove(e);
    });
    fabricCanvas.current.on('mouse:up', (e) => {
      tool.onMouseUp(e);
    });
    return () => {
      fabricCanvas.current.off('mouse:down');
      fabricCanvas.current.off('mouse:move');
      fabricCanvas.current.off('mouse:up');
    };
  }, [drawingOptions, fabricCanvas, tool]);

  return (
    <DrawingBoardStyle>
      <CanvasStyle ref={canvas} />
    </DrawingBoardStyle>
  );
};

DrawingBoard.propTypes = {
  drawingOptions: PropTypes.shape({
    tool: PropTypes.instanceOf(Tool).isRequired,
    strokeColor: PropTypes.string,
  }),
  size: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
};

DrawingBoard.defaultProps = {
  drawingOptions: PropTypes.shape({
    strokeColor: '#000000',
  }),
  size: {
    width: 500,
    height: 500,
  },
};

export default DrawingBoard;
