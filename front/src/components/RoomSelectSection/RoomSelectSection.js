import React from 'react';
import BackGroundStyle from './BackGroundStyle.style';
import PublicRoom from './PublicRoom/PublicRoom';
import PrivateRoom from './PrivateRoom/PrivateRoom';

const RoomSelectSection = () => (
  <BackGroundStyle>
    <PublicRoom />
    <PrivateRoom />
  </BackGroundStyle>
);

export default RoomSelectSection;
