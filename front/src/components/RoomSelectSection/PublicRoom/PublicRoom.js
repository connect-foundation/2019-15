import React, {useContext} from 'react';
import RoomContainer from '../RoomContainer/RoomContainer';
import PublicRoomButton from './PublicRoomButton.style';
import MainContext from '../../../Main.context';

const PublicRoom = () => {
  const buttons = ['3명', '6명', '12명', '100명'];

  const { io } = useContext(MainContext);

  const makeGameStartBtnHandler = (capacity) => {
    return () => {
      io.socket.emit(`enter_${capacity}`, {
        // 랜덤넘버 대신 유저아이디 or 닉네임이 들어가야함
        userId: parseInt(Math.random() * 1000, 0),
      });
    };
  };

  const buttonComponents = buttons.map((text) => (
    <PublicRoomButton key={text} onClick={makeGameStartBtnHandler(text)}>
      {text}
    </PublicRoomButton>
  ));

  return <RoomContainer text="랜덤 게임" buttons={buttonComponents} />;
};

export default PublicRoom;
