import React, { useContext, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import NavigationBar from 'components/NavigationBar/NavigationBar';
import { FlexRowStyle } from 'components/globalComponents/Container/Flex.style';
import GlobalContext from 'global.context';
import UserList from 'components/GamePlay/Userlist/Userlist';
import CanvasSection from 'components/GamePlay/CanvasSection/CanvasSection';
import Chatting from 'components/GamePlay/Chatting/Chatting';
import GamePlayContext from 'components/GamePlay/GamePlay.context';
import useGameSocket from 'hooks/Socket/useGameSocket';
import useGamePlay from 'hooks/GamePlay/useGamePlay';

const GamePlay = () => {
  const { gameSocket, setGameSocket, room, isLogin } = useContext(
    GlobalContext,
  );
  const contextValue = useGamePlay();
  const {
    setUserList,
    setPainter,
    setQuestionWord,
    setIsTimerGetReady,
    setIsLetterOpen,
    setSelectedWord,
    setShowQuestionResult,
    setScores,
    setRound,
    setEndTime,
    setIsWordChoiceOpen,
    setShowGameResult,
    initialQuestionWordState,
  } = contextValue;

  const history = useHistory();

  const resetQuestionStates = useCallback(
    (nextExaminerSocketId) => {
      if (nextExaminerSocketId) setPainter(nextExaminerSocketId);
      setQuestionWord(initialQuestionWordState);
      setIsLetterOpen(false);
      setSelectedWord('');
      setShowQuestionResult(false);
      // todo: 캔버스 데이터 초기화
    },
    [
      initialQuestionWordState,
      setIsLetterOpen,
      setPainter,
      setQuestionWord,
      setSelectedWord,
      setShowQuestionResult,
    ],
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
    [
      resetQuestionStates,
      setIsTimerGetReady,
      setIsWordChoiceOpen,
      setRound,
      setScores,
      setSelectedWord,
      setShowQuestionResult,
    ],
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
          history.replace('/main');
        }, 5000);
      }, 5000);
    },
    [
      history,
      resetQuestionStates,
      setIsTimerGetReady,
      setScores,
      setSelectedWord,
      setShowGameResult,
      setShowQuestionResult,
    ],
  );

  const prepareNewGameCallback = useCallback(() => {
    setIsTimerGetReady(false);
    setQuestionWord(initialQuestionWordState);
  }, [initialQuestionWordState, setIsTimerGetReady, setQuestionWord]);

  useGameSocket('userList', ({ playerList }) => {
    const parsedList = JSON.parse(playerList);
    setUserList(parsedList);
  });
  useGameSocket('roomCategory', ({ categoryId }) => {
    room.categoryId = categoryId;
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

  if (!isLogin || !gameSocket || gameSocket.disconnected) {
    history.replace('/main');
    return <></>;
  }

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
