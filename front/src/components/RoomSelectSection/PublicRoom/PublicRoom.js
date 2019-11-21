import React, { useContext } from 'react';
import RoomContainer from '../RoomContainer/RoomContainer';
import PublicRoomButton from './PublicRoomButton.style';
import GlobalContext from '../../../global.context';
import roomInfo from '../../../logics/room/roomInfo';

const PublicRoom = () => {
  const { io, user } = useContext(GlobalContext);
  const makeGameStartBtnHandler = (capacity) => {
    const clickGameStartBtn = () => {
      io.socket.emit(`enter_${capacity}`, {
        nickname: user.nickname,
      });
    };
    return clickGameStartBtn;
  };

  const buttonComponents = roomInfo.roomList.map((roomName) => (
    <PublicRoomButton
      key={roomName}
      onClick={makeGameStartBtnHandler(roomName)}
    >
      {roomName}
    </PublicRoomButton>
  ));

  return <RoomContainer text="랜덤 게임" buttons={buttonComponents} />;
};

export default PublicRoom;
