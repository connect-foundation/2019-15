import React from 'react';
import PropTypes from 'prop-types';
import RGB_LIST from 'constant/Tools';
import { ColorPickerStyle, ColorBoxList, ColorInfo } from './ColorPicker.style';
import ColorBox from './ColorBox';

ColorPicker.propTypes = {
  rgbList: PropTypes.arrayOf(String),
  color: PropTypes.string.isRequired,
  changeColor: PropTypes.func.isRequired,
};

ColorPicker.defaultProps = {
  rgbList: RGB_LIST,
};

export default function ColorPicker({ rgbList, color, changeColor }) {
  return (
    <ColorPickerStyle>
      <ColorBoxList>
        {rgbList.map((RGB) => (
          <ColorBox
            rgb={RGB}
            changeColor={() => {
              changeColor(RGB);
            }}
            key={RGB}
          />
        ))}
      </ColorBoxList>
      <ColorInfo>
        <ColorBox rgb={color} />
        <span>{color}</span>
      </ColorInfo>
    </ColorPickerStyle>
  );
}
