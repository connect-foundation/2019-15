import React from 'react';
import PropTypes from 'prop-types';
import ButtonStyle from './Button.style';

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
};

Button.defaultProps = {
  onClick: null,
  children: null,
};

export default function Button({ onClick, children }) {
  return <ButtonStyle onClick={onClick}>{children}</ButtonStyle>;
}
