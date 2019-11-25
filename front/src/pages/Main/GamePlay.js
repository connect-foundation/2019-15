import React, { useContext, useState, useEffect } from 'react';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import GameInfo from '../../components/GameInfo/GameInfo';
import { FlexRowStyle } from '../../components/globalComponents/Container/Flex.style';
import GlobalContext from '../../global.context';
import Userlist from '../../components/Userlist/Userlist';
import CanvasSection from '../../components/CanvasSection/CanvasSection';
import Chatting from '../../components/Chatting/Chatting';
import GamePlayContext from './GamePlay.context';
import GameLoading from '../../components/GameLoading/GameLoading';

const GamePlay = () => {
  const { io, room } = useContext(GlobalContext);
  const [userlist, setUserlist] = useState([]);
  const [painter, setPainter] = useState(null);

  useEffect(() => {
    const initSocket = async () => {
      await io.initUserlistMsgHandler({ setUserlist });
      await io.initGameStartMsgHandler({ setPainter });
    };
    initSocket();
  }, [io]);

  return (
    <GamePlayContext.Provider value={{ userlist, painter, setPainter }}>
      <GameLoading />
      <NavigationBar visible={room.roomType} />
      <GameInfo />
      <>
        <FlexRowStyle>
          <Userlist />
          <CanvasSection />
          <Chatting />
        </FlexRowStyle>
      </>
    </GamePlayContext.Provider>
  );
};

export default GamePlay;
