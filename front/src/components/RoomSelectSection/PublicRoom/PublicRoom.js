import React, { useContext } from 'react';
import RoomContainer from '../RoomContainer/RoomContainer';
import { PublicRoomButton, CustomA } from './PublicRoomButton.style';
import GlobalContext from '../../../global.context';
import roomInfo from '../../../constant/room/roomInfo';

const PublicRoom = () => {
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
};

export default PublicRoom;
