import React, { useState, useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import NavigationBar from 'components/NavigationBar/NavigationBar';
import { FlexRowStyle } from 'components/globalComponents/Container/Flex.style';
import GlobalContext from 'global.context';
import UserList from 'components/GamePlay/Userlist/Userlist';
import CanvasSection from 'components/GamePlay/CanvasSection/CanvasSection';
import Chatting from 'components/GamePlay/Chatting/Chatting';
import GamePlayContext from 'components/GamePlay/GamePlay.context';
import GameLoading from 'components/GamePlay/GameLoading/GameLoading';

const GamePlay = () => {
  const { io, room } = useContext(GlobalContext);

  const [userList, setUserList] = useState([]);
  const [painter, setPainter] = useState(null);

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
    <GamePlayContext.Provider
      value={{
        userList,
        setUserList,
        painter,
        setPainter,
      }}
    >
      <GameLoading />
      <NavigationBar />
      <>
        <FlexRowStyle>
          <UserList />
          <CanvasSection />
          <Chatting />
        </FlexRowStyle>
      </>
    </GamePlayContext.Provider>
  );
};

export default GamePlay;
