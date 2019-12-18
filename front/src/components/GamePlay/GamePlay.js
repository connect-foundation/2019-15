import React, { useState, useContext, useEffect, useCallback } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import NavigationBar from 'components/NavigationBar/NavigationBar';
import { FlexRowStyle } from 'components/globalComponents/Container/Flex.style';
import GlobalContext from 'global.context';
import UserList from 'components/GamePlay/Userlist/Userlist';
import CanvasSection from 'components/GamePlay/CanvasSection/CanvasSection';
import Chatting from 'components/GamePlay/Chatting/Chatting';
import GamePlayContext from 'components/GamePlay/GamePlay.context';
import useGameSocket from 'hooks/Socket/useGameSocket';

const GamePlay = () => {
  const { gameSocket, setGameSocket, setRoom } = useContext(GlobalContext);
  const history = useHistory();

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
  const [isLetterOpen, setIsLetterOpen] = useState(false);
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
  const [endTime, setEndTime] = useState(0);
  const [isWordChoiceOpen, setIsWordChoiceOpen] = useState(true);
  const [showGameResult, setShowGameResult] = useState(false);

  const resetQuestionStates = useCallback(
    function resetQuestionStates(nextExaminerSocketId) {
      if (nextExaminerSocketId) setPainter(nextExaminerSocketId);
      setQuestionWord(initialQuestionWordState);
      setIsLetterOpen(false);
      setSelectedWord('');
      setShowQuestionResult(false);
      // todo: 캔버스 데이터 초기화
    },
    [initialQuestionWordState],
  );

  const endQuestionCallback = useCallback(
    function endQuestionCallback({
      nextExaminerSocketId,
      _scores,
      answer,
      currentRound,
      totalRound,
    }) {
      // 타이머 멈추기
      setIsTimerGetReady(false);

      // 결과 화면 띄우기
      setSelectedWord(answer);
      setScores(_scores);
      setShowQuestionResult(true);

      setTimeout(() => {
        // 각종 상태 초기화하기
        resetQuestionStates(nextExaminerSocketId);
        setRound({ currentRound, totalRound });
        setIsWordChoiceOpen(true);
      }, 5000);
    },
    [resetQuestionStates],
  );

  const endGameCallback = useCallback(
    ({ _scores, answer }) => {
      // 타이머 멈추기
      setIsTimerGetReady(false);

      // 결과 화면 띄우기
      setSelectedWord(answer);
      setScores(_scores);
      setShowQuestionResult(true);

      // 게임 결과 띄우기
      setTimeout(() => {
        resetQuestionStates();
        setShowGameResult(true);

        // 게임 결과 지우고 메인으로 나가기
        setTimeout(() => {
          setShowGameResult(false);
          history.push('main');
        }, 5000);
      }, 5000);
    },
    [history, resetQuestionStates],
  );

  const prepareNewGameCallback = useCallback(() => {
    setIsTimerGetReady(false);
    setQuestionWord(initialQuestionWordState);
  }, [initialQuestionWordState]);

  useGameSocket('userList', ({ playerList }) => {
    const parsedList = JSON.parse(playerList);
    setUserList(parsedList);
  });

  useGameSocket('gamestart', ({ _painter, currentRound, totalRound }) => {
    setPainter(_painter);
    setRound({
      currentRound,
      totalRound,
    });
  });

  useGameSocket(
    'startQuestion',
    ({ wordLength, openLetter, openIndex, _endTime }) => {
      setQuestionWord({ wordLength, openLetter, openIndex });
      setEndTime(_endTime);
      setIsTimerGetReady(true);
    },
  );

  useGameSocket('endQuestion', endQuestionCallback);

  useGameSocket('endGame', endGameCallback);

  useGameSocket('prepareNewGame', prepareNewGameCallback);

  useEffect(() => {
    if (!gameSocket) return () => {};
    return () => {
      if (!gameSocket) return;
      gameSocket.close();
      setGameSocket(null);
    };
  }, [gameSocket, setGameSocket]);

  if (!gameSocket || gameSocket.disconnected) {
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
    isLetterOpen,
    setIsLetterOpen,
    selectedWord,
    setSelectedWord,
    showQuestionResult,
    setShowQuestionResult,
    scores,
    setScores,
    round,
    setRound,
    endTime,
    setEndTime,
    isWordChoiceOpen,
    setIsWordChoiceOpen,
    showGameResult,
    setShowGameResult,
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
