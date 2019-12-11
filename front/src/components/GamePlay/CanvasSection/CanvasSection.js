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

export default function CanvasSection() {
  const { gameSocket } = useContext(GlobalContext);
  const {
    userList,
    painter,
    questionWord,
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
    endTime,
    setEndTime,
  } = useContext(GamePlayContext);

  const [drawable, setDrawable] = useState(false);

  useEffect(() => {
    if (painter === gameSocket.id) {
      setDrawable(true);
    } else {
      setDrawable(false);
    }
    return () => {
      setDrawable(false);
    };
  }, [drawable, gameSocket.id, painter]);

  return (
    <CanvasSectionStyle>
      <GameLoading />
      {userList.length > 1 ? (
        <WordChoice setSelectedWord={setSelectedWord} />
      ) : null}
      {showQuestionResult ? (
        <QuestionResult scores={scores} answer={selectedWord} />
      ) : null}
      <section>
        <Timer
          isTimerGetReady={isTimerGetReady}
          setIsOpen={setIsOpen}
          endTime={endTime}
        />
        <GameInfo round={round} />
        <WordPreview
          openLetter={questionWord.openLetter}
          wordLength={questionWord.wordLength}
          openIndex={questionWord.openIndex}
          isOpen={isOpen}
          selectedWord={selectedWord}
        />
      </section>
      <DrawingPlayGround
        drawable={drawable}
        canvasSize={{ width: 760, height: 470 }}
      />
    </CanvasSectionStyle>
  );
}
