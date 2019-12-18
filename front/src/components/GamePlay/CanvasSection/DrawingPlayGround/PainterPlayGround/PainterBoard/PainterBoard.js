import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  PainterBoardStyle,
  CanvasStyle,
} from 'components/GamePlay/CanvasSection/DrawingPlayGround/PainterPlayGround/PainterBoard/PainterBoard.style';
import PainterToolManager from 'components/GamePlay/CanvasSection/DrawingPlayGround/PainterPlayGround/Tools/ToolType/PainterToolManager';
import useCanvasDataEmitWithCaching from 'hooks/DrawingPlayGround/useCanvasDataEmitWithCaching';
import useFabricCanvas from 'hooks/DrawingPlayGround/useFabricCanvas';
import DrawingPlayGroundContext from 'components/GamePlay/CanvasSection/DrawingPlayGround/DrawingPlayGround.context';
import History from 'components/GamePlay/CanvasSection/DrawingPlayGround/PainterPlayGround/PainterBoard/History/History';

PainterBoard.propTypes = {
  drawingOptions: PropTypes.shape({
    tool: PropTypes.oneOf(PainterToolManager.toolList),
    strokeColor: PropTypes.string,
  }),
};

PainterBoard.defaultProps = {
  drawingOptions: PropTypes.shape({
    tool: PainterToolManager.toolList[0],
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
    const tool = PainterToolManager[toolName];
    tool.setCanvas(fabricCanvas, drawingOptions);

    let emitable = false;
    let startPoint;
    let endPoint;

    const onMouseDown = (e) => {
      startPoint = e.pointer;
      tool.onMouseDown(e.pointer);

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

      eventListDispatch({
        type: 'push',
        value: {
          drawingOptions,
          pointers: getPointers(e.e),
          event: 'mouseMove',
        },
      if (!PainterToolManager.freeDrawingTools.includes(toolName)) return;
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
      if (!PainterToolManager.freeDrawingTools.includes(toolName) || !emitable)
      });
      emitable = false;
      startPoint = null;
      endPoint = null;
    const onObjectAdded = ({ target }) => {
      target.selectable = false;
      target.evented = false;
    };

    fabricCanvas.on('mouse:down', onMouseDown);
    fabricCanvas.on('mouse:move', onMouseMove);
    fabricCanvas.on('mouse:up', onMouseUp);
    fabricCanvas.on('object:added', onObjectAdded);
    return () => {
      fabricCanvas.off('mouse:down');
      fabricCanvas.off('mouse:move');
      fabricCanvas.off('mouse:up');
      fabricCanvas.on('object:added');
    };
  }, [drawingOptions, eventListDispatch, fabricCanvas, toolName]);

  return (
    <PainterBoardStyle>
      <CanvasStyle ref={attachFabricCanvas} />
    </PainterBoardStyle>
  );
}
