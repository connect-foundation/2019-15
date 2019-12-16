import React from 'react';
import PropTypes from 'prop-types';
import TimerSelect from './Select.style';

Select.propTypes = {
  option: PropTypes.arrayOf(PropTypes.string).isRequired,
  defaultOption: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

Select.defaultProps = {
  defaultOption: null,
};

export default function Select({ option, defaultOption, onChange }) {
  const options = option.map((optionValue) => (
    <option selected={optionValue === defaultOption}>{optionValue}</option>
  ));

  return <TimerSelect onChange={onChange}>{options}</TimerSelect>;
}
