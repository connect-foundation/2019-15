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
import History from 'components/GamePlay/CanvasSection/DrawingPlayGround/PainterPlayGround/PainterBoard/History/History';

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

const POINTER_LIST = [
  'offsetX',
  'offsetY',
  'screenX',
  'screenY',
  'clientX',
  'clientY',
];
const getPointers = (e) => {
  return POINTER_LIST.reduce((acc, cur) => {
    acc[cur] = e[cur];
    return acc;
  }, {});
};

export default function PainterBoard({ drawingOptions }) {
  const { canvasSize } = useContext(DrawingPlayGroundContext);
  const { tool: toolName } = drawingOptions;
  const eventListDispatch = useCanvasDataEmitWithCaching();
  const [fabricCanvas, attachFabricCanvas] = useFabricCanvas(canvasSize);

  useEffect(() => {
    if (!fabricCanvas) return () => {};
    const tool = ToolManager[toolName];
    tool.setCanvas(fabricCanvas, drawingOptions);
    let emitable = false;
    let startPoint;
    let endPoint;

    const onMouseDown = (e) => {
      startPoint = e.pointer;
      tool.onMouseDown(e.pointer);
      if (!ToolManager.freeDrawingTools.includes(toolName)) return;

      emitable = true;
      eventListDispatch({
        type: 'push',
        value: {
          drawingOptions,
          pointers: getPointers(e.e),
          event: 'mouseDown',
        },
      });
    };
    const onMouseMove = (e) => {
      tool.onMouseMove(e.pointer);
      if (!ToolManager.freeDrawingTools.includes(toolName) || !emitable) return;

      eventListDispatch({
        type: 'push',
        value: {
          drawingOptions,
          pointers: getPointers(e.e),
          event: 'mouseMove',
        },
      });
    };
    const onMouseUp = (e) => {
      endPoint = e.pointer;
      tool.onMouseUp(e.pointer);
      eventListDispatch({
        type: 'push',
        value: {
          drawingOptions,
          startPoint,
          endPoint,
          pointers: getPointers(e.e),
          event: 'mouseUp',
        },
      });
      emitable = false;
      startPoint = null;
      endPoint = null;
    };

    fabricCanvas.on('mouse:down', onMouseDown);
    fabricCanvas.on('mouse:move', onMouseMove);
    fabricCanvas.on('mouse:up', onMouseUp);
    return () => {
      fabricCanvas.off('mouse:down');
      fabricCanvas.off('mouse:move');
      fabricCanvas.off('mouse:up');
    };
  }, [drawingOptions, eventListDispatch, fabricCanvas, toolName]);

  return (
    <PainterBoardStyle>
      {/* <History fabricCanvas={fabricCanvas} /> */}
      <CanvasStyle ref={attachFabricCanvas} />
    </PainterBoardStyle>
  );
}
