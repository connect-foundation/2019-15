import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  PainterBoardStyle,
  CanvasStyle,
} from 'components/GamePlay/CanvasSection/DrawingPlayGround/PainterBoard/PainterBoard.style';
import ToolManager from 'components/GamePlay/CanvasSection/DrawingPlayGround/Tools/ToolType/ToolManager';
import useCanvasDataEmitWithCaching from 'hooks/DrawingPlayGround/useCanvasDataEmitWithCaching';
import useFabricCanvas from 'hooks/DrawingPlayGround/useFabricCanvas';
import { fab } from '@fortawesome/free-brands-svg-icons';

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
  const eventListDispatch = useCanvasDataEmitWithCaching();
  const [fabricCanvas, setFabricCanvas] = useFabricCanvas(size);

  useEffect(() => {
    const tool = ToolManager[toolName];
    tool.setCanvas(fabricCanvas.current, drawingOptions);
    const fabricCopy = fabricCanvas.current;
    let emitable = false;

    const onMouseDown = ({ pointer }) => {
      tool.onMouseDown(pointer);
      if (toolName !== 'pen') return;
      emitable = true;
      eventListDispatch({
        type: 'push',
        value: { drawingOptions, pointer, event: 'mouseDown' },
      });
    };
    const onMouseMove = ({ pointer }) => {
      tool.onMouseMove(pointer);
      if (toolName !== 'pen' || !emitable) return;

      eventListDispatch({
        type: 'push',
        value: { drawingOptions, pointer, event: 'mouseMove' },
      });
    };
    const onMouseUp = ({ pointer }) => {
      tool.onMouseUp(pointer);
      eventListDispatch({
        type: 'push',
        value: {
          drawingOptions,
          data: fabricCanvas.current.toJSON(),
          event: 'mouseUp',
        },
      });
      emitable = false;
    };
    const onMouseOut = () => {
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
      emitable = false;
    };

    fabricCopy.on('mouse:down', onMouseDown);
    fabricCopy.on('mouse:move', onMouseMove);
    fabricCopy.on('mouse:up', onMouseUp);
    fabricCopy.on('mouse:out', onMouseOut);
    return () => {
      fabricCopy.off('mouse:down');
      fabricCopy.off('mouse:move');
      fabricCopy.off('mouse:up');
      fabricCopy.off('mouse:out');
    };
  }, [drawingOptions, eventListDispatch, fabricCanvas, toolName]);

  return (
    <PainterBoardStyle>
      <CanvasStyle ref={setFabricCanvas} style={{ width, height }} />
    </PainterBoardStyle>
  );
}
