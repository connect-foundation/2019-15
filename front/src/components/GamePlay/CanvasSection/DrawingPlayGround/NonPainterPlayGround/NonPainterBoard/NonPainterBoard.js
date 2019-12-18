/* eslint no-param-reassign:0 */
import React, { useContext } from 'react';
import {
  NonPainterBoardStyle,
  CanvasStyle,
} from 'components/GamePlay/CanvasSection/DrawingPlayGround/NonPainterPlayGround/NonPainterBoard/NonPainterBoard.style';

import PropTypes from 'prop-types';
import useFabricCanvas from 'hooks/DrawingPlayGround/useFabricCanvas';
import useGameSocket from 'hooks/Socket/useGameSocket';
import DrawingPlayGroundContext from 'components/GamePlay/CanvasSection/DrawingPlayGround/DrawingPlayGround.context';
import ToolManager from 'components/GamePlay/CanvasSection/DrawingPlayGround/NonPainterPlayGround/NonPainterBoard/ToolType/ToolManager';
import Pen from 'components/GamePlay/CanvasSection/DrawingPlayGround/NonPainterPlayGround/NonPainterBoard/ToolType/Pen';

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
  const [fabricCanvas, attachFabricCanvas] = useFabricCanvas(canvasSize);

  const handlePenEvents = (e) => {
    const { pointers, event, drawingOptions } = e;
    const curToolType = ToolManager[drawingOptions.tool];

    curToolType.setCanvas(fabricCanvas, drawingOptions);
    if (event === 'mouseDown') {
      curToolType.onMouseDown(pointers);
    } else if (event === 'mouseMove') {
      curToolType.onMouseMove(pointers);
    } else if (event === 'mouseUp') {
      curToolType.onMouseUp(pointers);
    }
  };

  const setCanvas = (eventList) => {
    eventList.forEach((e) => {
      if (!ToolManager.freeDrawingTools.includes(e.drawingOptions.tool)) {
        ToolManager[e.drawingOptions.tool].draw(fabricCanvas, e);
      }
      handlePenEvents(e);
    });
  };

  useGameSocket('drawing', ({ eventList }) => {
    setCanvas(eventList);
  });
  return (
    <NonPainterBoardStyle>
      <CanvasStyle ref={attachFabricCanvas} />
    </NonPainterBoardStyle>
  );
}
