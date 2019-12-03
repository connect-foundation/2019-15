import React from 'react';
import PropTypes from 'prop-types';
import { ToolsStyle } from 'components/CanvasSection/DrawingPlayGround/Tools/Tools.style';
import ColorPicker from 'components/CanvasSection/DrawingPlayGround/Tools/ColorPicker/ColorPicker';
import ToolType from 'components/CanvasSection/DrawingPlayGround/Tools/ToolType/ToolType';
import ToolManager from 'components/CanvasSection/DrawingPlayGround/Tools/ToolType/ToolManager';

Tools.propTypes = {
  drawingOptions: PropTypes.shape({
    tool: PropTypes.oneOf(ToolManager.TOOL_LIST),
    strokeColor: PropTypes.string,
  }),
  setDrawingOptions: PropTypes.func.isRequired,
};

Tools.defaultProps = {
  drawingOptions: PropTypes.shape({
    tool: ToolManager.TOOL_LIST[0],
    strokeColor: '#000000',
  }),
};

export default function Tools({ drawingOptions, setDrawingOptions }) {
  const { tool, strokeColor } = drawingOptions;
  const changeTool = (toolToChange) => {
    setDrawingOptions({ type: 'tool', value: toolToChange });
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
}
