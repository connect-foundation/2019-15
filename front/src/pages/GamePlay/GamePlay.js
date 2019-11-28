import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import NavigationBar from '../../components/NavigationBar/NavigationBar';
import GameInfo from '../../components/GameInfo/GameInfo';
import { FlexRowStyle } from '../../components/globalComponents/Container/Flex.style';
import GlobalContext from '../../global.context';
import UserList from '../../components/Userlist/Userlist';
import CanvasSection from '../../components/CanvasSection/CanvasSection';
import Chatting from '../../components/Chatting/Chatting';
import GamePlayContext from '../../GamePlay.context';
import GameLoading from '../../components/GameLoading/GameLoading';

const GamePlay = () => {
  const { io, room } = useContext(GlobalContext);
  const { setUserList, setPainter } = useContext(GamePlayContext);

  useEffect(() => {
    const initSocket = async () => {
      if (io.socket) {
        await io.initUserListMsgHandler({ setUserList });
        await io.initGameStartMsgHandler({ setPainter });
        await io.setEndQuestionHandler();
      }
    };
    initSocket();
  }, [io, setPainter, setUserList]);

  if (io.socket === null) {
    return <Redirect to="main" />;
  }

  return (
    <>
      <GameLoading />
      <NavigationBar visible={room.roomType} />
      <GameInfo />
      <>
        <FlexRowStyle>
          <UserList />
          <CanvasSection />
          <Chatting />
        </FlexRowStyle>
      </>
    </>
  );
};

export default GamePlay;
