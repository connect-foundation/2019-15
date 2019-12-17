import React from 'react';
import PropTypes from 'prop-types';
import SelectStyle from './Select.style';

Select.propTypes = {
  option: PropTypes.arrayOf(PropTypes.string),
  defaultOption: PropTypes.string,
  onChangeSelect: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

Select.defaultProps = {
  option: [],
  defaultOption: null,
};

export default function Select({
  option,
  defaultOption,
  onChangeSelect,
  disabled,
}) {
  const options = option.map((optionValue) => (
    <option selected={optionValue === defaultOption}>{optionValue}</option>
  ));

  return (
    <SelectStyle disabled={disabled} onChange={onChangeSelect}>
      {options}
    </SelectStyle>
  );
}
