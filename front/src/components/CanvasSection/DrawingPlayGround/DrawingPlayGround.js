import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tools from 'components/CanvasSection/DrawingPlayGround/Tools/Tools';
import PainterBoard from 'components/CanvasSection/DrawingPlayGround/PainterBoard/PainterBoard';
import NonPainterBoard from 'components/CanvasSection/DrawingPlayGround/NonPainterBoard/NonPainterBoard';
import DrawingPlayGroundStyle from './DrawingPlayGround.style';

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
    default:
      throw new Error();
  }
};

export default function DrawingPlayGround({ drawable, canvasSize }) {
  const defaultDrawingOptions = {
    tool: 'pen',
    strokeColor: '#000000',
    strokeWidth: 10,
    fillColor: '#000000',
  };

  useEffect(() => {
    drawingOptionsDispatcher({ type: 'tool', value: 'pen' });
  }, [drawable]);
  const [drawingOptions, drawingOptionsDispatcher] = useReducer(
    setDrawingOptions,
    defaultDrawingOptions,
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
        <NonPainterBoard size={canvasSize} />
      )}
    </DrawingPlayGroundStyle>
  );
}
