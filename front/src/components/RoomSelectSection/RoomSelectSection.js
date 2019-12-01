import React from 'react';
import PublicRoom from './PublicRoom/PublicRoom';
import PrivateRoom from './PrivateRoom/PrivateRoom';

export default function RoomSelectSection() {
  return (
    <>
      <PublicRoom />
      <PrivateRoom />
    </>
  );
}
