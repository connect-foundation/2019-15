import React, { useState, useContext, useEffect } from 'react';
import GamePlayContext from 'components/GamePlay/GamePlay.context';
import GlobalContext from 'global.context';
import DrawingPlayGround from './DrawingPlayGround/DrawingPlayGround';
import WordChoice from './WordChoice/WordChoice';
import CanvasSectionStyle from './CanvasSection.style';
import WordPreview from './WordPreview/WordPreview';
import Timer from '../../Timer/Timer';
import GameInfo from '../../GameInfo/GameInfo';
import Section from './Section.style';
import QuestionResult from './QuestionResult/QuestionResult';

export default function CanvasSection() {
  const {
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
  } = useContext(GamePlayContext);
  const { io } = useContext(GlobalContext);

  const [drawable, setDrawable] = useState(false);

  useEffect(() => {
    if (painter === io.socket.id) {
      setDrawable(true);
    }
  }, [drawable, io.socket.id, painter]);

  return (
    <CanvasSectionStyle>
      {io.socket.id === painter ? (
        <WordChoice setSelectedWord={setSelectedWord} />
      ) : null}
      {showQuestionResult ? (
        <QuestionResult scores={scores} answer={selectedWord} />
      ) : null}
      <Section>
        <GameInfo />
        <Timer
          isTimerGetReady={isTimerGetReady}
          setIsTimerGetReady={setIsTimerGetReady}
          setIsOpen={setIsOpen}
        />
        <WordPreview
          openLetter={questionWord.openLetter}
          wordLength={questionWord.wordLength}
          openIndex={questionWord.openIndex}
          isOpen={isOpen}
          selectedWord={selectedWord}
        />
      </Section>
      <DrawingPlayGround
        drawable={drawable}
        canvasSize={{ width: 800, height: 490 }}
      />
    </CanvasSectionStyle>
  );
}
