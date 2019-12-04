import React, { useState, useContext, useEffect } from 'react';
import GamePlayContext from 'GamePlay.context';
import GlobalContext from 'global.context';
import DrawingPlayGround from './DrawingPlayGround/DrawingPlayGround';
import WordChoice from './WordChoice/WordChoice';
import CanvasSectionStyle from './CanvasSection.style';
import WordPreview from './WordPreview/WordPreview';
import Timer from '../Timer/Timer';

export default function CanvasSection() {
  const { painter } = useContext(GamePlayContext);
  const { io } = useContext(GlobalContext);
  const [questionWord, setQuestionWord] = useState({
    wordLength: 0,
    openLetter: '',
    openIndex: 0,
  });
  const [drawable, setDrawable] = useState(false);

  const [isTimerGetReady, setIsTimerGetReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWord, setSelectedWord] = useState('');

  io.setStartQuestionHandler(setQuestionWord, () => {
    setIsTimerGetReady(true);
  });

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
      <section>
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
      </section>
      <DrawingPlayGround
        drawable={drawable}
        canvasSize={{ width: 800, height: 600 }}
      />
    </CanvasSectionStyle>
  );
}
