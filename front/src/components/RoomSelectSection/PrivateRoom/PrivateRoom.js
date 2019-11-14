import React from 'react';
import RoomContainer from '../RoomContainer/RoomContainer';
import PrivateRoomButton from './privateRoomButton.style';

const PrivateRoom = () => {
  const buttons = ['방 만들기'];

  const buttonComponents = buttons.map((text) => (
    <PrivateRoomButton key={text}>{text}</PrivateRoomButton>
  ));

  return <RoomContainer text="비밀 게임" buttons={buttonComponents} />;
};
export default PrivateRoom;
