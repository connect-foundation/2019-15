import React, { useContext } from 'react';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import GameInfo from '../../components/GameInfo/GameInfo';
import { FlexRowStyle } from '../../components/globalComponents/Container/Flex.style';
import GlobalContext from '../../global.context';
import Userlist from '../../components/Userlist/Userlist';
import Canvas from '../../components/Canvas/Canvas';
import Chatting from '../../components/Chatting/Chatting';
import BackGroundStyle from '../../components/RoomSelectSection/BackGroundStyle.style';

const GamePlay = () => {
  const { room } = useContext(GlobalContext);

  return (
    <>
      <NavigationBar visible={room.roomType} />
      <GameInfo />
      <BackGroundStyle>
        <FlexRowStyle>
          <Userlist />
          <Canvas />
          <Chatting />
        </FlexRowStyle>
      </BackGroundStyle>
    </>
  );
};

export default GamePlay;
