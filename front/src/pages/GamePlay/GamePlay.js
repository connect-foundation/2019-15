import React, { useState, useContext, useEffect } from 'react';
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
  setStartQuestionHandler,
  setEndQuestionHandler,
  closeSocket,
} from 'logics/socketLogic';

const GamePlay = () => {
  const { gameSocket, setGameSocket, room } = useContext(GlobalContext);

  const [userList, setUserList] = useState([]);
  const [painter, setPainter] = useState(null);
  const initialQuestionWordState = {
    wordLength: 0,
    openLetter: '',
    openIndex: 0,
  };
  // 설정 : startQuestion 시그널을 받을 때
  // 초기화 : endQuestion 시그널을 받을 때
  const [questionWord, setQuestionWord] = useState(initialQuestionWordState);
  // 설정 : GamePlay 컴포넌트에서 startQuestion 시그널을 받을 때
  // 초기화 : endQuestion 시그널을 받을 때
  const [isTimerGetReady, setIsTimerGetReady] = useState(false);
  // 설정 : Timer 컴포넌트에서 일정 시간이 지났을 때
  // 초기화 : endQuestion 시그널을 받을 때
  const [isOpen, setIsOpen] = useState(false);
  // 설정 : WordChoice 컴포넌트에서 단어 선택 시, endQuestion 시그널을 받을 때
  // 초기화 : QuestionResult 컴포넌트가 사라질 때
  const [selectedWord, setSelectedWord] = useState('');
  // 설정 : endQuestion 시그널을 받을 때
  // 초기화 : QuestionResult 컴포넌트가 렌더링되고 3초 후
  const [showQuestionResult, setShowQuestionResult] = useState(false);
  // 설정 : endQuestion 시그널을 받을 때
  // 초기화 : QuestionResult 컴포넌트가 렌더링되고 3초 후
  const [scores, setScores] = useState([]);
  // 설정 : gamestart, endQuestion 시그널을 받을 때
  const [round, setRound] = useState({
    currentRound: 1,
    totalRound: 3,
  });

  function endQuestionCallback({
    nextExaminerSocketId,
    _scores,
    answer,
    currentRound,
    totalRound,
  }) {
    // 결과 화면 띄우기
    setSelectedWord(answer);
    setScores(_scores);
    setShowQuestionResult(true);

    setTimeout(() => {
      // 각종 상태 초기화하기
      resetQuestionStates(nextExaminerSocketId);
      setRound({ currentRound, totalRound });
      setShowQuestionResult(false);
    }, 5000);
  }

  function resetQuestionStates(nextExaminerSocketId) {
    setPainter(nextExaminerSocketId);
    setQuestionWord(initialQuestionWordState);
    setIsTimerGetReady(false);
    setIsOpen(false);
    setSelectedWord('');
    // todo: 캔버스 데이터 초기화
  }

  useEffect(() => {
    const initSocket = () => {
      if (!gameSocket) return;
      initUserListMsgHandler(gameSocket, { setUserList });
      initGameStartMsgHandler(gameSocket, { setPainter, setRound });
      setStartQuestionHandler(gameSocket, setQuestionWord, () => {
        setIsTimerGetReady(true);
      });
      setEndQuestionHandler(gameSocket, endQuestionCallback);
    };
    initSocket();

    return () => {
      closeSocket(gameSocket, { setGameSocket });
    };
  }, [gameSocket, setGameSocket, setPainter, setUserList]);

  if (!gameSocket || gameSocket.connected === false) {
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
    showQuestionResult,
    setShowQuestionResult,
    scores,
    setScores,
    round,
    setRound,
  };

  return (
    <GamePlayContext.Provider value={contextValue}>
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
