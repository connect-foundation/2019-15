import React, { useState, useContext, useEffect } from 'react';
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
import { useMutation } from '@apollo/react-hooks';
import { SAVE_CANVAS_DATA } from 'queries/video';
import GamePlayContext from 'components/GamePlay/GamePlay.context';

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

export default function PainterBoard({ drawingOptions }) {
  const { canvasSize } = useContext(DrawingPlayGroundContext);
  const { tool: toolName } = drawingOptions;
  const eventListDispatch = useCanvasDataEmitWithCaching();
  const [fabricCanvas, attachFabricCanvas] = useFabricCanvas(canvasSize);
  const [lastDrawingTime, setLastDrawingTime] = useState(new Date());
  const [saveCanvasData] = useMutation(SAVE_CANVAS_DATA);
  const { selectedWord } = useContext(GamePlayContext);

  useEffect(() => {
    if (!fabricCanvas) return () => { };
    const tool = PainterToolManager[toolName];
    tool.setCanvas(fabricCanvas, drawingOptions);

    let emitable = false;
    let startPoint;
    let endPoint;

    const clear = () => {
      emitable = false;
      startPoint = null;
      endPoint = null;
    };

    const pushEventListDispatch = (event, options) => {
      eventListDispatch({
        type: 'push',
        value: {
          ...options,
          event,
        },
      });
    };

    const onMouseDown = ({ pointer, e }) => {
      startPoint = pointer;
      tool.onMouseDown(pointer);
      if (!PainterToolManager.freeDrawings.includes(toolName)) return;

      pushEventListDispatch('onMouseDown', {
        drawingOptions,
        offset: getOffset(e),
      });
      emitable = true;
    };
    const onMouseMove = ({ pointer, e }) => {
      tool.onMouseMove(pointer);

      if (
        !PainterToolManager.freeDrawings.includes(toolName) ||
        !emitable ||
        !isEventInCanvas(e)
      )
        return;

      pushEventListDispatch('onMouseMove', {
        drawingOptions,
        offset: getOffset(e),
      });
    };
    const onMouseUp = ({ pointer, e }) => {
      endPoint = pointer;
      tool.onMouseUp(pointer);
      let options;
      if (PainterToolManager.freeDrawings.includes(toolName)) {
        options = { drawingOptions, offset: getOffset(e) };
      } else {
        options = { drawingOptions, startPoint, endPoint };
      }
      pushEventListDispatch('onMouseUp', options);
      clear();
    };

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

  useEffect(() => {
    if (!fabricCanvas) return () => { };
    const saveFullCanvasData = async () => {
      const dataObject = fabricCanvas.toJSON();
      const currentTime = new Date();
      if (currentTime - lastDrawingTime > 3000) {
        await saveCanvasData({
          variables: {
            data: JSON.stringify(dataObject.objects),
            questionWord: selectedWord,
          },
        });
        setLastDrawingTime(currentTime);
      }
    };
    fabricCanvas.on('object:added', saveFullCanvasData);
    return () => {
      fabricCanvas.off('object:added');
    };
  }, [selectedWord, fabricCanvas, lastDrawingTime, saveCanvasData]);

  return (
    <PainterBoardStyle>
      <CanvasStyle ref={attachFabricCanvas} />
    </PainterBoardStyle>
  );
}
