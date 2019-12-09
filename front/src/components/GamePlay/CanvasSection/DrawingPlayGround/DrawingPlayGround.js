import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import Tools from 'components/GamePlay/CanvasSection/DrawingPlayGround/Tools/Tools';
import PainterBoard from 'components/GamePlay/CanvasSection/DrawingPlayGround/PainterBoard/PainterBoard';
import NonPainterBoard from 'components/GamePlay/CanvasSection/DrawingPlayGround/NonPainterBoard/NonPainterBoard';
import { ToolsStyle } from 'components/GamePlay/CanvasSection/DrawingPlayGround/Tools/Tools.style';

import { DEFAULT_DRAWING_OPTIONS } from 'constant/DrawingPlayGround';
import {
  DrawingPlayGroundStyle,
  CenterSpanStyle,
} from './DrawingPlayGround.style';

DrawingPlayGround.propTypes = {
  drawable: PropTypes.bool.isRequired,
  canvasSize: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
};

DrawingPlayGround.defaultProps = {
  canvasSize: {
    width: 500,
    height: 500,
  },
};

const setDrawingOptions = (prev, { type, value }) => {
  switch (type) {
    case 'tool':
      return { ...prev, tool: value };
    case 'strokeColor':
      return { ...prev, strokeColor: value };
    case 'strokeWidth':
      return { ...prev, strokeWidth: value };
    case 'fillColor':
      return { ...prev, fillColor: value };
    default:
      throw new Error(`${type} is wrong action type`);
  }
};

export default function DrawingPlayGround({ drawable, canvasSize }) {
  const [drawingOptions, drawingOptionsDispatcher] = useReducer(
    setDrawingOptions,
    DEFAULT_DRAWING_OPTIONS,
  );

  return (
    <DrawingPlayGroundStyle>
      {drawable ? (
        <>
          <PainterBoard drawingOptions={drawingOptions} size={canvasSize} />
          <Tools
            drawingOptions={drawingOptions}
            setDrawingOptions={drawingOptionsDispatcher}
          />
        </>
      ) : (
        <>
          <NonPainterBoard size={canvasSize} />
          <ToolsStyle>
            <CenterSpanStyle>출제자가 그림을 그리고 있습니다.</CenterSpanStyle>
          </ToolsStyle>
        </>
      )}
    </DrawingPlayGroundStyle>
  );
}
