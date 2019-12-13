import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import types from 'logics/alert';
import AlertStyle from './Alert.style';

Alert.propTypes = {
  Wrapper: PropTypes.elementType,
  type: PropTypes.oneOf(Object.keys(types)).isRequired,
};

Alert.defaultProps = {
  Wrapper: () => {
    return <></>;
  },
};

export default function Alert({ Wrapper, type }) {
  return (
    <Wrapper>
      <AlertStyle>
        <FontAwesomeIcon icon={types[type].icon} size="3x" />
        <p>{types[type].message}</p>
      </AlertStyle>
    </Wrapper>
  );
}
