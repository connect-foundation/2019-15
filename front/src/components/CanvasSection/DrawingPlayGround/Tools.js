import React from 'react';
import PropTypes from 'prop-types';
import { ToolsStyle } from './Tools.style';
import ColorPicker from './ColorPicker/ColorPicker';
import ToolType from './ToolType/ToolType';
import Tool from './ToolType/Tool';

const Tools = ({ drawingOptions, setDrawingOptions }) => {
  const { tool, strokeColor } = drawingOptions;
  const changeTool = (toolName) => {
    setDrawingOptions({ type: 'tool', value: toolName });
  };

  const changeColor = (rgb) => {
    setDrawingOptions({ type: 'strokeColor', value: rgb });
  };

  return (
    <ToolsStyle>
      <div>
        <ToolType tool={tool} changeTool={changeTool} />
      </div>
      <div>
        <ColorPicker color={strokeColor} changeColor={changeColor} />
      </div>
    </ToolsStyle>
  );
};

Tools.propTypes = {
  drawingOptions: PropTypes.shape({
    tool: PropTypes.instanceOf(Tool).isRequired,
    strokeColor: PropTypes.string,
  }),
  setDrawingOptions: PropTypes.func.isRequired,
};

Tools.defaultProps = {
  drawingOptions: PropTypes.shape({
    strokeColor: '#000000',
  }),
};

export default Tools;
