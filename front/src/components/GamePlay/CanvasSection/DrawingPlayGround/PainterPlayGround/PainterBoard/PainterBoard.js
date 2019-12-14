import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  PainterBoardStyle,
  CanvasStyle,
} from 'components/GamePlay/CanvasSection/DrawingPlayGround/PainterPlayGround/PainterBoard/PainterBoard.style';
import ToolManager from 'components/GamePlay/CanvasSection/DrawingPlayGround/PainterPlayGround/Tools/ToolType/ToolManager';
import useCanvasDataEmitWithCaching from 'hooks/DrawingPlayGround/useCanvasDataEmitWithCaching';
import useFabricCanvas from 'hooks/DrawingPlayGround/useFabricCanvas';
import DrawingPlayGroundContext from 'components/GamePlay/CanvasSection/DrawingPlayGround/DrawingPlayGround.context';

PainterBoard.propTypes = {
  drawingOptions: PropTypes.shape({
    tool: PropTypes.oneOf(ToolManager.toolList),
    strokeColor: PropTypes.string,
  }),
};

PainterBoard.defaultProps = {
  drawingOptions: PropTypes.shape({
    tool: ToolManager.toolList[0],
    strokeColor: '#000000',
  }),
};

export default function PainterBoard({ drawingOptions }) {
  const { canvasSize } = useContext(DrawingPlayGroundContext);
  const { tool: toolName } = drawingOptions;
  const eventListDispatch = useCanvasDataEmitWithCaching();
  const [fabricCanvas, setFabricCanvas] = useFabricCanvas(canvasSize);

  useEffect(() => {
    const tool = ToolManager[toolName];
    tool.setCanvas(fabricCanvas.current, drawingOptions);
    const fabricCopy = fabricCanvas.current;
    let emitable = false;

    const onMouseDown = ({ pointer }) => {
      tool.onMouseDown(pointer);
      if (!ToolManager.freeDrawingTools.includes(toolName)) return;
      emitable = true;
      eventListDispatch({
        type: 'push',
        value: { drawingOptions, pointer, event: 'mouseDown' },
      });
    };
    const onMouseMove = ({ pointer }) => {
      tool.onMouseMove(pointer);
      if (!ToolManager.freeDrawingTools.includes(toolName) || !emitable) return;

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

    fabricCopy.on('mouse:down', onMouseDown);
    fabricCopy.on('mouse:move', onMouseMove);
    fabricCopy.on('mouse:up', onMouseUp);
    return () => {
      fabricCopy.off('mouse:down');
      fabricCopy.off('mouse:move');
      fabricCopy.off('mouse:up');
    };
  }, [drawingOptions, eventListDispatch, fabricCanvas, toolName]);

  return (
    <PainterBoardStyle>
      <CanvasStyle ref={setFabricCanvas} />
    </PainterBoardStyle>
  );
}
