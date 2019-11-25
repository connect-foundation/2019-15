import React from 'react';
import PropTypes from 'prop-types';
import SButtonStyle from './SButton.style';

const SButton = ({ onClick, children, active }) => (
  <SButtonStyle onClick={onClick} active={active}>
    {children}
  </SButtonStyle>
);

SButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  active: PropTypes.bool,
};

SButton.defaultProps = {
  onClick: null,
  children: null,
  active: false,
};

export default SButton;
