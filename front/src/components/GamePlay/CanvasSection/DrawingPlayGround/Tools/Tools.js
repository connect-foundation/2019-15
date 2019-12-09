import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { ToolsStyle } from 'components/GamePlay/CanvasSection/DrawingPlayGround/Tools/Tools.style';
import ColorPicker from 'components/GamePlay/CanvasSection/DrawingPlayGround/Tools/ColorPicker/ColorPicker';
import ToolType from 'components/GamePlay/CanvasSection/DrawingPlayGround/Tools/ToolType/ToolType';
import ToolManager from 'components/GamePlay/CanvasSection/DrawingPlayGround/Tools/ToolType/ToolManager';
import StrokeWidth from 'components/GamePlay/CanvasSection/DrawingPlayGround/Tools/StrokeWidth/StrokeWidth';

Tools.propTypes = {
  drawingOptions: PropTypes.shape({
    tool: PropTypes.oneOf(ToolManager.TOOL_LIST),
    strokeColor: PropTypes.string,
    strokeWidth: PropTypes.number,
  }),
  setDrawingOptions: PropTypes.func.isRequired,
};

Tools.defaultProps = {
  drawingOptions: PropTypes.shape({
    tool: ToolManager.TOOL_LIST[0],
    strokeColor: '#000000',
    strokeWidth: 10,
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

  const changeStrokeWidth = useCallback(
    (newStrokeWidth) => {
      setDrawingOptions({ type: 'strokeWidth', value: newStrokeWidth });
    },
    [setDrawingOptions],
  );

  return (
    <ToolsStyle>
      <div>
        <ToolType tool={tool} changeTool={changeTool} />
      </div>
      <div>
        <ColorPicker color={strokeColor} changeColor={changeColor} />
      </div>
      <div>
        <StrokeWidth changeStrokeWidth={changeStrokeWidth} />
      </div>
    </ToolsStyle>
  );
}
