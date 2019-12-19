import React, { useContext } from 'react';
import uuid from 'uuid/v1';
import { useHistory } from 'react-router-dom';
import GlobalContext from 'global.context';
import { PrivateRoomList } from 'constants/room/roomInfo';
import RoomContainer from '../RoomContainer/RoomContainer';
import PrivateRoomButton from './privateRoomButton.style';

export default function PrivateRoom() {
  const { gameSocket } = useContext(GlobalContext);
  const history = useHistory();
  const onClickMakeRoomBtn = () => {
    const privateRoomId = uuid();
    history.push(`/setting:${privateRoomId}`);
    gameSocket.emit('makePrivate', { roomId: privateRoomId });
  };
  const buttonComponents = PrivateRoomList.map((text) => (
    <PrivateRoomButton key={text} onClick={onClickMakeRoomBtn}>
      {text}
    </PrivateRoomButton>
  ));

  return <RoomContainer text="비밀 게임" buttons={buttonComponents} />;
}
