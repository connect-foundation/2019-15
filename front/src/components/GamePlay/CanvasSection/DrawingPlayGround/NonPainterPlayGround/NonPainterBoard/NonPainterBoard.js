/* eslint no-param-reassign:0 */
import React, { useEffect, useContext } from 'react';
import {
  NonPainterBoardStyle,
  CanvasStyle,
} from 'components/GamePlay/CanvasSection/DrawingPlayGround/NonPainterPlayGround/NonPainterBoard/NonPainterBoard.style';
import PropTypes from 'prop-types';
import useFabricCanvas from 'hooks/DrawingPlayGround/useFabricCanvas';
import useGameSocket from 'hooks/Socket/useGameSocket';
import DrawingPlayGroundContext from 'components/GamePlay/CanvasSection/DrawingPlayGround/DrawingPlayGround.context';
import NonPainterToolManager from 'components/GamePlay/CanvasSection/DrawingPlayGround/NonPainterPlayGround/NonPainterBoard/ToolType/NonPainterToolManager';
import GamePlayContext from 'components/GamePlay/GamePlay.context';

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

export default function NonPainterBoard() {
  const { canvasSize } = useContext(DrawingPlayGroundContext);
  const { gameState } = useContext(GamePlayContext);
  const { painter } = gameState;
  const [fabricCanvas, attachFabricCanvas] = useFabricCanvas(canvasSize);

  useEffect(() => {
    if (!fabricCanvas) return;
    fabricCanvas.clear();
  }, [fabricCanvas, painter]);

  const setCanvas = (eventList) => {
    eventList.forEach((e) => {
      const { pointer, event, drawingOptions } = e;
      const curToolType = NonPainterToolManager[drawingOptions.tool];

      if (!NonPainterToolManager.freeDrawings.includes(drawingOptions.tool)) {
        NonPainterToolManager[drawingOptions.tool].draw(e);
        return;
      }
      curToolType.setOptions(drawingOptions);
      curToolType[event](pointer);
    });
  };

  useEffect(() => {
    if (!fabricCanvas) return () => {};

    NonPainterToolManager.initialize(fabricCanvas);
    const onObjectAdded = ({ target }) => {
      target.selectable = false;
      target.evented = false;
    };
    fabricCanvas.on('object:added', onObjectAdded);
    return () => {
      fabricCanvas.off('object:added');
    };
  }, [fabricCanvas]);

  useGameSocket('drawing', ({ eventList }) => {
    setCanvas(eventList);
  });
  return (
    <NonPainterBoardStyle>
      <CanvasStyle ref={attachFabricCanvas} />
    </NonPainterBoardStyle>
  );
}
