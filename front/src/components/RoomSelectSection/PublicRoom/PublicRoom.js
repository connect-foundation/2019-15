import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import GlobalContext from 'global.context';
import { PublicRoomList } from 'constant/room/roomInfo';
import { enterRandom } from 'logics/socketLogic';
import RoomContainer from '../RoomContainer/RoomContainer';
import { PublicRoomButton } from './PublicRoomButton.style';

export default function PublicRoom() {
  const { gameSocket, user } = useContext(GlobalContext);
  const history = useHistory();
  const makeGameStartBtnHandler = (roomType) => {
    return () => {
      enterRandom(gameSocket, { nickname: user.nickname, roomType });
      history.push('public');
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
