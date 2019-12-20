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
  const [
    gameState,
    gameStateDispatch,
    initialQuestionWordState,
  ] = useGamePlay();

  const history = useHistory();

  const resetQuestionStates = useCallback(
    (nextExaminerSocketId) => {
      if (nextExaminerSocketId)
        gameStateDispatch({
          type: 'setPainter',
          painter: nextExaminerSocketId,
        });
      gameStateDispatch({
        type: 'setQuestionWord',
        questionWord: initialQuestionWordState,
      });
      gameStateDispatch({ type: 'setIsLetterOpen', isLetterOpen: false });
      gameStateDispatch({ type: 'setSelectedWord', selectedWord: '' });
      gameStateDispatch({
        type: 'setShowQuestionResult',
        showQuestionResult: false,
      });
    },
    [initialQuestionWordState, gameStateDispatch],
  );

  const endQuestionCallback = useCallback(
    function endQuestionCallback({
      nextExaminerSocketId,
      _scores,
      answer,
      currentRound,
      totalRound,
    }) {
      gameStateDispatch({ type: 'setIsTimerGetReady', isTimerGetReady: false });
      gameStateDispatch({ type: 'setSelectedWord', selectedWord: answer });
      gameStateDispatch({ type: 'setScores', scores: _scores });
      gameStateDispatch({
        type: 'setShowQuestionResult',
        showQuestionResult: true,
      });

      setTimeout(() => {
        // 각종 상태 초기화하기
        resetQuestionStates(nextExaminerSocketId);
        gameStateDispatch({
          type: 'setRound',
          round: { currentRound, totalRound },
        });
        gameStateDispatch({
          type: 'setIsWordChoiceOpen',
          isWordChoiceOpen: true,
        });
      }, 5000);
    },
    [resetQuestionStates, gameStateDispatch],
  );

  const endGameCallback = useCallback(
    ({ _scores, answer }) => {
      gameStateDispatch({ type: 'setIsTimerGetReady', isTimerGetReady: false });
      gameStateDispatch({ type: 'setSelectedWord', selectedWord: answer });
      gameStateDispatch({ type: 'setScores', scores: _scores });
      gameStateDispatch({
        type: 'setShowQuestionResult',
        showQuestionResult: true,
      });

      // 게임 결과 띄우기
      setTimeout(() => {
        resetQuestionStates();
        // setShowGameResult(true);
        gameStateDispatch({ type: 'setShowGameResult', showGameResult: true });

        // 게임 결과 지우고 메인으로 나가기
        setTimeout(() => {
          // setShowGameResult(false);
          gameStateDispatch({
            type: 'setShowGameResult',
            showGameResult: false,
          });
          history.replace('/main');
        }, 5000);
      }, 5000);
    },
    [history, resetQuestionStates, gameStateDispatch],
  );

  const prepareNewGameCallback = useCallback(() => {
    gameStateDispatch({ type: 'setIsTimerGetReady', isTimerGetReady: false });
    gameStateDispatch({
      type: 'setQuestionWord',
      questionWord: initialQuestionWordState,
    });
  }, [initialQuestionWordState, gameStateDispatch]);

  useGameSocket('userList', ({ playerList }) => {
    const parsedList = JSON.parse(playerList);
    console.log('userList', playerList, parsedList);
    gameStateDispatch({ type: 'setUserList', userList: parsedList });
  });
  useGameSocket('roomCategory', ({ categoryId }) => {
    room.categoryId = categoryId;
  });
  useGameSocket('gamestart', ({ _painter, currentRound, totalRound }) => {
    gameStateDispatch({ type: 'setPainter', painter: _painter });
    gameStateDispatch({
      type: 'setRound',
      round: {
        currentRound,
        totalRound,
      },
    });
  });
  useGameSocket(
    'startQuestion',
    ({ wordLength, openLetter, openIndex, _endTime }) => {
      gameStateDispatch({
        type: 'setQuestionWord',
        questionWord: { wordLength, openLetter, openIndex },
      });
      gameStateDispatch({ type: 'setEndTime', endTime: _endTime });
      gameStateDispatch({ type: 'setIsTimerGetReady', isTimerGetReady: true });
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
    <GamePlayContext.Provider value={{ gameState, gameStateDispatch }}>
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
