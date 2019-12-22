import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import regex from 'constants/nicknameRegex';
import TextInputStyle from './TextInput.style';

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

export default function TextInput({ onChange, value, onChangeComplete }) {
  const [input, setInput] = useState(value);
  const onInputChange = useCallback(
    (e) => {
      if (regex.test(e.target.value)) {
        setInput(e.target.value);
        onChange(e);
      }
    },
    [onChange, setInput],
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
}
