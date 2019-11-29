import React, { useContext } from 'react';
import uuid from 'uuid/v1';
import { Link } from 'react-router-dom';
import GlobalContext from '../../../global.context';
import RoomContainer from '../RoomContainer/RoomContainer';
import PrivateRoomButton from './privateRoomButton.style';

const PrivateRoom = () => {
  const { user } = useContext(GlobalContext);
  const secretRoomId = uuid();
  const buttons = ['방 만들기'];
  const onClickMakeRoomBtn = () => {
    user.roomOwner = true;
  };
  const buttonComponents = buttons.map((text) => (
    <PrivateRoomButton key={text} onClick={onClickMakeRoomBtn}>
      <Link to={`secret:${secretRoomId}`}>{text}</Link>
    </PrivateRoomButton>
  ));

  return <RoomContainer text="비밀 게임" buttons={buttonComponents} />;
};
export default PrivateRoom;
