import React, { useState, useContext } from 'react';
import DrawingPlayGround from './DrawingPlayGround/DrawingPlayGround';
import WordChoice from './WordChoice/WordChoice';
import CanvasSectionStyle from './CanvasSection.style';
import GamePlayContext from '../../GamePlay.context';
import GlobalContext from '../../global.context';
import WordPreview from './WordPreview/WordPreview';
import Timer from '../Timer/Timer';

const CanvasSection = () => {
  const { painter } = useContext(GamePlayContext);
  const { io } = useContext(GlobalContext);
  const [questionWord, setQuestionWord] = useState({
    wordLength: 0,
    openLetter: '',
    openIndex: 0,
  });
  const [isTimerStart, setIsTimerStart] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWord, setSelectedWord] = useState('');

  io.setStartQuestionHandler(setQuestionWord, () => {
    setIsTimerStart(true);
  });

  return (
    <CanvasSectionStyle>
      {io.socket.id === painter ? (
        <WordChoice setSelectedWord={setSelectedWord} />
      ) : null}
      <section>
        <Timer
          isTimerStart={isTimerStart}
          setIsTimerStart={setIsTimerStart}
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
      <DrawingPlayGround canvasSize={{ width: 800, height: 600 }} />
    </CanvasSectionStyle>
  );
};

export default CanvasSection;
