import React, { useContext } from 'react';
import GlobalContext from 'global.context';
import roomInfo from 'constant/room/roomInfo';
import RoomContainer from '../RoomContainer/RoomContainer';
import { PublicRoomButton, CustomA } from './PublicRoomButton.style';

export default function PublicRoom() {
  const { io, user, room } = useContext(GlobalContext);
  const makeGameStartBtnHandler = (capacity) => {
    return () => {
      io.socket.emit(`enter${capacity}`, {
        nickname: user.nickname,
        roomType: room.roomType,
      });
    };
  };

  const buttonComponents = roomInfo.roomList.map((roomName) => (
    <CustomA href="/#/gameplay" key={roomName}>
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
