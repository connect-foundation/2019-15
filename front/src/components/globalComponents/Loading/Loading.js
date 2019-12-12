import React from 'react';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import {
  CogStyle,
  LoadingStyle,
} from 'components/globalComponents/Loading/Loading.style';
import PropTypes from 'prop-types';

Loading.propTypes = {
  Wrapper: PropTypes.elementType,
};

Loading.defaultProps = {
  Wrapper: () => {
    return <></>;
  },
};

export default function Loading({ Wrapper }) {
  return (
    <Wrapper>
      <LoadingStyle>
        <CogStyle icon={faCog} spin size="3x" />
      </LoadingStyle>
    </Wrapper>
  );
}
