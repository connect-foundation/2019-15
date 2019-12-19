import React, { useContext } from 'react';
import GlobalContext from 'global.context';
import { PublicRoomList } from 'constants/room/roomInfo';
import RoomContainer from '../RoomContainer/RoomContainer';
import { PublicRoomButton } from './PublicRoomButton.style';

export default function PublicRoom() {
  const { gameSocket, user } = useContext(GlobalContext);
  const makeGameStartBtnHandler = (roomType) => {
    return () => {
      gameSocket.emit('enterRandom', {
        nickname: user.nickname,
        roomType,
        avatar: user.avatar,
      });
    };
  };

  const buttonComponents = PublicRoomList.map((roomName) => (
    <PublicRoomButton
      key={roomName}
      onClick={makeGameStartBtnHandler(roomName)}
    >
      {roomName}
    </PublicRoomButton>
  ));

  return <RoomContainer text="랜덤 게임" buttons={buttonComponents} />;
}
