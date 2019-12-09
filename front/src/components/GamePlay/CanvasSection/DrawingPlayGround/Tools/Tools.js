import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  ToolsStyle,
  ToolTitleStyle,
} from 'components/GamePlay/CanvasSection/DrawingPlayGround/Tools/Tools.style';
import ColorPicker from 'components/GamePlay/CanvasSection/DrawingPlayGround/Tools/ColorPicker/ColorPicker';
import ToolType from 'components/GamePlay/CanvasSection/DrawingPlayGround/Tools/ToolType/ToolType';
import ToolManager from 'components/GamePlay/CanvasSection/DrawingPlayGround/Tools/ToolType/ToolManager';
import Slider from 'components/globalComponents/Slider/Slider';

Tools.propTypes = {
  drawingOptions: PropTypes.shape({
    tool: PropTypes.oneOf(ToolManager.toolList),
    strokeColor: PropTypes.string,
    strokeWidth: PropTypes.number,
  }),
  setDrawingOptions: PropTypes.func.isRequired,
};

Tools.defaultProps = {
  drawingOptions: PropTypes.shape({
    tool: ToolManager.toolList[0],
    strokeColor: '#000000',
    strokeWidth: 10,
  }),
};

export default function Tools({ drawingOptions, setDrawingOptions }) {
  const { tool, strokeColor, strokeWidth, fillColor } = drawingOptions;
  const changeTool = (toolToChange) => {
    setDrawingOptions({ type: 'tool', value: toolToChange });
  };

  const changeStrokeColor = (rgb) => {
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
        <ToolTitleStyle>도구</ToolTitleStyle>
        <ToolType tool={tool} changeTool={changeTool} />
      </div>
      <div>
        <ToolTitleStyle>선 굵기</ToolTitleStyle>
        <Slider
          max={50}
          min={5}
          unit={5}
          initialStep={strokeWidth}
          onChange={changeStrokeWidth}
        />
      </div>
      <div>
        <ToolTitleStyle>선 색</ToolTitleStyle>
        <ColorPicker color={strokeColor} changeColor={changeStrokeColor} />
      </div>
    </ToolsStyle>
  );
}
