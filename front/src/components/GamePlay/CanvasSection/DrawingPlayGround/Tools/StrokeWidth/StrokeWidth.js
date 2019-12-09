import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'components/globalComponents/Slider/Slider';
import { ToolTitleStyle } from 'components/GamePlay/CanvasSection/DrawingPlayGround/Tools/ToolType/ToolType.style';

StrokeWidth.propTypes = {
  strokeWidth: PropTypes.number,
  changeStrokeWidth: PropTypes.func.isRequired,
};

StrokeWidth.defaultProps = {
  strokeWidth: 10,
};

export default function StrokeWidth({ strokeWidth, changeStrokeWidth }) {
  return (
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
  );
}
