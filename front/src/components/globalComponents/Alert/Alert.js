import React from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import types from '../../../logics/alert';
import AlertStyle from './Alert.style';

const Alert = ({ type }) => {
  return (
    <AlertStyle>
      <FontAwesomeIcon icon={types[type].icon} size="3x" />
      <p>{types[type].message}</p>
    </AlertStyle>
  );
};

Alert.propTypes = {
  type: PropTypes.oneOf(Object.keys(types)).isRequired,
};
export default Alert;
