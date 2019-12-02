import React, { useEffect, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { fabric } from 'fabric';
import GlobalContext from 'global.context';
import { DrawingBoardStyle, CanvasStyle } from './DrawingBoard.style';
import Tool from './ToolType/Tool';

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

export default function DrawingBoard({ drawingOptions, size }) {
  const { tool } = drawingOptions;
  const { width, height } = size;
  const canvas = useRef(null);
  const fabricCanvas = useRef(null);
  const { io, room } = useContext(GlobalContext);

  useEffect(() => {
    async function setCanvasImage({ image }) {
      await fabricCanvas.current.loadFromJSON(image);
    }

    async function init() {
      await io.initImageSendHandler({ setCanvasImage });
    }
    init();
  }, [io]);

  useEffect(() => {
    fabricCanvas.current = new fabric.Canvas(canvas.current, {
      isDrawingMode: true,
      width,
      height,
    });
  }, [canvas, height, width]);

  useEffect(() => {
    async function sendImageToServer() {
      const image = fabricCanvas.current.toJSON();
      io.sendImage({ roomId: room.roomId, image });
    }

    tool.setCanvas(fabricCanvas.current, drawingOptions);
    fabricCanvas.current.on('mouse:down', (e) => {
      tool.onMouseDown(e);
    });
    fabricCanvas.current.on('mouse:move', (e) => {
      tool.onMouseMove(e);
    });
    fabricCanvas.current.on('mouse:up', (e) => {
      tool.onMouseUp(e);
      sendImageToServer();
    });

    return () => {
      fabricCanvas.current.off('mouse:down');
      fabricCanvas.current.off('mouse:move');
      fabricCanvas.current.off('mouse:up');
    };
  }, [drawingOptions, fabricCanvas, height, io, room, tool, width]);

  return (
    <DrawingBoardStyle>
      <CanvasStyle ref={canvas} style={{ width, height }} />
    </DrawingBoardStyle>
  );
}
