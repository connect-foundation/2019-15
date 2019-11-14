import React from 'react';
import RoomContainer from '../RoomContainer/RoomContainer';
import PublicRoomButton from './PublicRoomButton.style';

const PublicRoom = () => {
  const buttons = ['3명', '6명', '12명', '100명'];

  const buttonComponents = buttons.map((text) => (
    <PublicRoomButton key={text}>{text}</PublicRoomButton>
  ));

  return <RoomContainer text="랜덤 게임" buttons={buttonComponents} />;
};

export default PublicRoom;
