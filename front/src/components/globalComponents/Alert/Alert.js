import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import types from 'logics/alert';
import AlertStyle from './Alert.style';

Alert.propTypes = {
  type: PropTypes.oneOf(Object.keys(types)).isRequired,
};

export default function Alert({ type }) {
  return (
    <AlertStyle>
      <FontAwesomeIcon icon={types[type].icon} size="3x" />
      <p>{types[type].message}</p>
    </AlertStyle>
  );
}
