import React from 'react';
import PropTypes from 'prop-types';
import SelectStyle from './Select.style';

Select.propTypes = {
  option: PropTypes.arrayOf(PropTypes.string),
  defaultOption: PropTypes.string,
  onChangeSelect: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  reference: PropTypes.any.isRequired,
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
  reference,
}) {
  const options = option.map((optionValue) => (
    <option selected={optionValue === defaultOption}>{optionValue}</option>
  ));

  return (
    <SelectStyle ref={reference} disabled={disabled} onChange={onChangeSelect}>
      {options}
    </SelectStyle>
  );
}
