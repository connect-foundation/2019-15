import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import SelectStyle from './Select.style';

Select.propTypes = {
  option: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.shape({ value: PropTypes.string, text: PropTypes.string }),
    ),
  ),
  defaultOption: PropTypes.string,
  onChangeSelect: PropTypes.func,
  disabled: PropTypes.bool.isRequired,
  reference: PropTypes.shape(useRef),
};

Select.defaultProps = {
  option: [{ value: '0', text: '0' }],
  defaultOption: '',
  onChangeSelect: () => {},
  reference: null,
};

export default function Select({
  option,
  defaultOption,
  onChangeSelect,
  disabled,
  reference,
}) {
  let options = [];
  options = option.map((optionValue) => (
    <option
      key={optionValue.value}
      value={optionValue.value}
      defaultValue={optionValue === defaultOption}
    >
      {optionValue.text}
    </option>
  ));

  return (
    <SelectStyle ref={reference} disabled={disabled} onChange={onChangeSelect}>
      {options}
    </SelectStyle>
  );
}
