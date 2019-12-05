import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import NavigationBar from 'components/NavigationBar/NavigationBar';
import { FlexRowStyle } from 'components/globalComponents/Container/Flex.style';
import GlobalContext from 'global.context';
import UserList from 'components/GamePlay/Userlist/Userlist';
import CanvasSection from 'components/GamePlay/CanvasSection/CanvasSection';
import Chatting from 'components/GamePlay/Chatting/Chatting';
import GamePlayContext from 'components/GamePlay/GamePlay.context';
import {
  initUserListMsgHandler,
  initGameStartMsgHandler,
  setEndQuestionHandler,
  closeSocket,
} from 'logics/socketLogic';

GamePlay.propTypes = {
  propUserList: PropTypes.arrayOf(
    PropTypes.shape({ nickname: PropTypes.string, socketId: PropTypes.string }),
  ),
};

GamePlay.defaultProps = {
  propUserList: [],
};

export default function GamePlay({ propUserList }) {
  const { gameSocket, setGameSocket, room } = useContext(GlobalContext);

  const [userList, setUserList] = useState(propUserList);
  const [painter, setPainter] = useState(null);

  useEffect(() => {
    const initSocket = () => {
      if (!gameSocket) return;
      initUserListMsgHandler(gameSocket, { setUserList });
      initGameStartMsgHandler(gameSocket, { setPainter });
      setEndQuestionHandler(gameSocket);
    };
    initSocket();

    return () => {
      closeSocket(gameSocket, { setGameSocket });
    };
  }, [gameSocket, setGameSocket, setPainter, setUserList]);

  if (!gameSocket || gameSocket.disconnected) {
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
      <NavigationBar visible={room.roomType} />
      <>
        <FlexRowStyle>
          <UserList />
          <CanvasSection />
          <Chatting />
        </FlexRowStyle>
      </>
    </GamePlayContext.Provider>
  );
}
