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
  const [questionWord, setQuestionWord] = useState({
    wordLength: 0,
    openLetter: '',
    openIndex: 0,
  });
  const [isTimerGetReady, setIsTimerGetReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWord, setSelectedWord] = useState('');

  useEffect(() => {
    const initSocket = async () => {
      if (io.socket) {
        await io.initUserListMsgHandler({ setUserList });
        await io.initGameStartMsgHandler({ setPainter });
        io.setStartQuestionHandler(setQuestionWord, () => {
          setIsTimerGetReady(true);
        });
        await io.setEndQuestionHandler();
      }
    };
    initSocket();
  }, [io, setPainter, setUserList]);

  if (io.socket === null) {
    return <Redirect to="main" />;
  }

  const contextValue = {
    userList,
    setUserList,
    painter,
    setPainter,
    questionWord,
    setQuestionWord,
    isTimerGetReady,
    setIsTimerGetReady,
    isOpen,
    setIsOpen,
    selectedWord,
    setSelectedWord,
  };

  return (
    <GamePlayContext.Provider value={contextValue}>
      <GameLoading />
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
};

export default GamePlay;
