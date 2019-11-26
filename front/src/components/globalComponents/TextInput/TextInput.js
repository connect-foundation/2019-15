import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import TextInputStyle from './TextInput.style';
import regex from '../../../logics/TextInput';

const TextInput = ({ onChange, value, onChangeComplete }) => {
  const [input, setInput] = useState(value);
  const onInputChange = useCallback(
    (e) => {
      if (regex.test(e.target.value)) {
        setInput(e.target.value);
        onChange(e);
      }
    },
    [onChange],
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChangeComplete(input);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [input, onChangeComplete]);

  return (
    <TextInputStyle
      type="text"
      value={value}
      onChange={onInputChange}
      maxLength="12"
    />
  );
};

TextInput.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  onChangeComplete: PropTypes.func,
};

TextInput.defaultProps = {
  onChange: () => {},
  value: '',
  onChangeComplete: () => {},
};

export default TextInput;
