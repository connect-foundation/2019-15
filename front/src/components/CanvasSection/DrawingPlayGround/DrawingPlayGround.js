import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import Tools from './Tools/Tools';
import DrawingPlayGroundStyle from './DrawingPlayGround.style';
import DrawingBoard from './DrawingBoard/DrawingBoard';
import ToolManager from './Tools/ToolType/ToolManager';

const toolManager = new ToolManager();

const setDrawingOptions = (prev, { type, value }) => {
  switch (type) {
    case 'tool':
      return { ...prev, tool: toolManager[value] };
    case 'strokeColor':
      return { ...prev, strokeColor: value };
    default:
      throw new Error();
  }
};

const DrawingPlayGround = ({ canvasSize }) => {
  const defaultDrawingOptions = {
    tool: toolManager.pen,
    strokeColor: '#000000',
  };
  const [drawingOptions, drawingOptionsDispatcher] = useReducer(
    setDrawingOptions,
    defaultDrawingOptions,
  );

  return (
    <DrawingPlayGroundStyle>
      <DrawingBoard drawingOptions={drawingOptions} size={canvasSize} />
      <Tools
        drawingOptions={drawingOptions}
        setDrawingOptions={drawingOptionsDispatcher}
      />
    </DrawingPlayGroundStyle>
  );
};

DrawingPlayGround.propTypes = {
  canvasSize: {
    width: PropTypes.number,
    height: PropTypes.number,
  },
};

DrawingPlayGround.defaultProps = {
  canvasSize: {
    width: 500,
    height: 500,
  },
};

export default DrawingPlayGround;
