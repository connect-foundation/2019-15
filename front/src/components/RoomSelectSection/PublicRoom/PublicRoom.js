import React, { useContext } from 'react';
import GlobalContext from 'global.context';
import { PublicRoomList } from 'constant/room/roomInfo';
import { enterRandom } from 'logics/socketLogic';
import RoomContainer from '../RoomContainer/RoomContainer';
import { PublicRoomButton, CustomA } from './PublicRoomButton.style';

export default function PublicRoom() {
  const { gameSocket, user } = useContext(GlobalContext);
  const makeGameStartBtnHandler = (roomType) => {
    return () => {
      enterRandom(gameSocket, { nickname: user.nickname, roomType });
    };
  };

  const buttonComponents = PublicRoomList.roomList.map((roomName) => (
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
