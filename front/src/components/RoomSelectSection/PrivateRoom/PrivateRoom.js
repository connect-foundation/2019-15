import React from 'react';
import uuid from 'uuid/v1';
import { Link } from 'react-router-dom';
import RoomContainer from '../RoomContainer/RoomContainer';
import PrivateRoomButton from './privateRoomButton.style';

const PrivateRoom = () => {
  const secretRoomId = uuid();
  const buttons = ['방 만들기'];
  const onClickMakeRoomBtn = () => {};
  const buttonComponents = buttons.map((text) => (
    <PrivateRoomButton key={text} onClick={onClickMakeRoomBtn}>
      <Link to={`secret:${secretRoomId}`}>{text}</Link>
    </PrivateRoomButton>
  ));

  return <RoomContainer text="비밀 게임" buttons={buttonComponents} />;
};
export default PrivateRoom;
