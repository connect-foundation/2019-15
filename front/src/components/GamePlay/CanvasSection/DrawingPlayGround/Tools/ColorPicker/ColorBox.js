import React from 'react';
import PropTypes from 'prop-types';
import ColorBoxStyle from 'components/GamePlay/CanvasSection/DrawingPlayGround/Tools/ColorPicker/ColorBox.style';

ColorBox.propTypes = {
  rgb: PropTypes.string.isRequired,
  changeColor: PropTypes.func,
};

ColorBox.defaultProps = {
  changeColor: () => {},
};

export default function ColorBox({ rgb, changeColor }) {
  return <ColorBoxStyle rgb={rgb} onClick={changeColor} />;
}
