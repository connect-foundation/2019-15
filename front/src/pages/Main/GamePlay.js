import React, {useContext} from 'react';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import GameInfo from '../../components/GameInfo/GameInfo';
import {FlexRowStyle} from '../../components/globalComponents/Container/Flex.style';
import MainContext from '../../Main.context';
import Userlist from '../../components/Userlist/Userlist';
import Canvas from '../../components/Canvas/Canvas';
import Chatting from '../../components/Chatting/Chatting';

const GamePlay = () => {
  const { room } = useContext(MainContext);
  return (
    <>
      <NavigationBar visible={room.roomType} />
      <GameInfo />
      <>
        <FlexRowStyle>
          <Userlist />
          <Canvas />
          <Chatting />
        </FlexRowStyle>
      </>
    </>
  );
};

export default GamePlay;
