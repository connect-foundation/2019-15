import React from 'react';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import {
  CogStyle,
  LoadingStyle,
} from 'components/globalComponents/Loading/Loading.style';

export default function Loading() {
  return (
    <LoadingStyle>
      <CogStyle icon={faCog} spin size="3x" />
    </LoadingStyle>
  );
}
