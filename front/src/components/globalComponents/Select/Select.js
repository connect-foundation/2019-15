import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import SelectStyle from './Select.style';

Select.propTypes = {
  optionList: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      text: PropTypes.string,
    }),
  ),
  defaultOption: PropTypes.string,
  onChangeSelect: PropTypes.func,
  disabled: PropTypes.bool.isRequired,
  reference: PropTypes.shape(useRef),
};

Select.defaultProps = {
  optionList: [{ value: '0', text: '0' }],
  defaultOption: '',
  onChangeSelect: () => {},
  reference: null,
};

export default function Select({
  optionList,
  defaultOption,
  onChangeSelect,
  disabled,
  reference,
}) {
  return (
    <SelectStyle
      ref={reference}
      disabled={disabled}
      onChange={onChangeSelect}
      value={defaultOption}
    >
      {optionList.map((optionValue) => (
        <option key={optionValue.value} value={optionValue.value}>
          {optionValue.text}
        </option>
      ))}
    </SelectStyle>
  );
}
