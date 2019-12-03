import React, { useContext } from 'react';
import GlobalContext from 'global.context';
import roomInfo from 'constant/room/roomInfo';
import RoomContainer from '../RoomContainer/RoomContainer';
import { PublicRoomButton, CustomA } from './PublicRoomButton.style';

export default function PublicRoom() {
  const { io, user } = useContext(GlobalContext);
  const makeGameStartBtnHandler = (roomType) => {
    return () => {
      io.socket.emit('enterRandom', {
        nickname: user.nickname,
        roomType,
      });
    };
  };

  const buttonComponents = roomInfo.roomList.map((roomName) => (
    <CustomA to="gameplay" key={roomName}>
      <PublicRoomButton
        key={roomName}
        onClick={makeGameStartBtnHandler(roomName)}
      >
        {roomName}
      </PublicRoomButton>
    </CustomA>
  ));

  return <RoomContainer text="랜덤 게임" buttons={buttonComponents} />;
}
