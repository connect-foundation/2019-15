import React, { useState, useContext, useEffect } from 'react';
import GamePlayContext from 'components/GamePlay/GamePlay.context';
import GlobalContext from 'global.context';
import GameLoading from 'components/GamePlay/GameLoading/GameLoading';
import DrawingPlayGround from './DrawingPlayGround/DrawingPlayGround';
import WordChoice from './WordChoice/WordChoice';
import CanvasSectionStyle from './CanvasSection.style';
import WordPreview from './WordPreview/WordPreview';
import Timer from '../../Timer/Timer';
import GameInfo from '../../GameInfo/GameInfo';
import QuestionResult from './QuestionResult/QuestionResult';
import GameResult from './GameResult/GameResult';

export default function CanvasSection() {
  const { gameSocket } = useContext(GlobalContext);
  const {
    userList,
    painter,
    questionWord,
    isTimerGetReady,
    isLetterOpen,
    setIsLetterOpen,
    selectedWord,
    setSelectedWord,
    showQuestionResult,
    scores,
    round,
    endTime,
    showGameResult,
  } = useContext(GamePlayContext);

  const [drawable, setDrawable] = useState(false);
  const [painterNickname, setPainterNickname] = useState(null);

  useEffect(() => {
    const painterInfo = userList.filter((user) => user.socketId === painter);
    if (painterInfo.length > 0) setPainterNickname(painterInfo[0].nickname);

    if (painter === gameSocket.id) {
      setDrawable(true);
    } else {
      setDrawable(false);
    }
    return () => {
      setDrawable(false);
    };
  }, [drawable, gameSocket.id, painter, userList]);

  return (
    <CanvasSectionStyle>
      <GameLoading />
      {userList.length > 1 && !showQuestionResult && !showGameResult ? (
        <WordChoice setSelectedWord={setSelectedWord} />
      ) : null}
      {showQuestionResult ? (
        <QuestionResult scores={scores} answer={selectedWord} />
      ) : null}
      {showGameResult ? <GameResult scores={scores} /> : null}
      <section>
        <Timer
          isTimerGetReady={isTimerGetReady}
          setIsLetterOpen={setIsLetterOpen}
          endTime={endTime}
        />
        <GameInfo round={round} />
        <WordPreview
          openLetter={questionWord.openLetter}
          wordLength={questionWord.wordLength}
          openIndex={questionWord.openIndex}
          isLetterOpen={isLetterOpen}
          selectedWord={selectedWord}
        />
      </section>
      <DrawingPlayGround
        drawable={drawable}
        canvasSize={{ width: 760, height: 470 }}
        painterNickname={painterNickname}
      />
    </CanvasSectionStyle>
  );
}
