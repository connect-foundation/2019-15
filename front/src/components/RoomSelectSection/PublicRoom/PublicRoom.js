import React, { useContext } from 'react';
import RoomContainer from '../RoomContainer/RoomContainer';
import PublicRoomButton from './PublicRoomButton.style';
// eslint-disable-next-line import/no-cycle
import MainSocketContext from '../../../pages/Main/Main.context';

const PublicRoom = () => {
  const buttons = ['3명', '6명', '12명', '100명'];

  const { io } = useContext(MainSocketContext);

  const makeGameStartBtnHandler = (capacity) => {
    const clickGameStartBtn = () => {
      io.socket.emit(`enter_${capacity}`, 3);
    };
    return clickGameStartBtn;
  };

  const buttonComponents = buttons.map((text) => (
    <PublicRoomButton key={text} onClick={makeGameStartBtnHandler(text)}>
      {text}
    </PublicRoomButton>
  ));

  return <RoomContainer text="랜덤 게임" buttons={buttonComponents} />;
};

export default PublicRoom;
