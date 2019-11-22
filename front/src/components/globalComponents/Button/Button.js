import React from 'react';
import PropTypes from 'prop-types';
import ButtonStyle from './Button.style';

const Button = ({ onClick, children }) => (
  <ButtonStyle onClick={onClick}>{children}</ButtonStyle>
);

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
};

Button.defaultProps = {
  onClick: null,
  children: null,
};

export default Button;
