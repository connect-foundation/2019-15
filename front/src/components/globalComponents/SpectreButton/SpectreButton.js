import React from 'react';
import PropTypes from 'prop-types';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { SpectreButtonStyle, SyncIconStyle } from './SpectreButton.style';

const SpectreButton = ({ onClick, children, active, loading }) => (
  <SpectreButtonStyle onClick={onClick} active={active}>
    {loading ? <SyncIconStyle icon={faSync} spin size="1x" /> : children}
  </SpectreButtonStyle>
);

SpectreButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  active: PropTypes.bool,
  loading: PropTypes.bool,
};

SpectreButton.defaultProps = {
  onClick: null,
  children: null,
  active: false,
  loading: false,
};

export default SpectreButton;
