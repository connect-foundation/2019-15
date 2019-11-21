import React from 'react';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { CogStyle, LoadingStyle } from './Loading.style';

const Loading = () => (
  <LoadingStyle>
    <CogStyle icon={faCog} spin size="3x" />
  </LoadingStyle>
);

export default Loading;
