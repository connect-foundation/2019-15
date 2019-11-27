import React, { useState, useContext, useRef } from 'react';
import DrawingPlayGround from './DrawingPlayGround/DrawingPlayGround';
import WordChoice from './WordChoice/WordChoice';
import CanvasSectionStyle from './CanvasSection.style';
import GamePlayContext from '../../pages/GamePlay/GamePlay.context';
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
  const timerRef = useRef(null);

  io.setStartQuestionHandler(setQuestionWord, () => {
    timerRef.current.triggerTimer();
  });

  return (
    <CanvasSectionStyle>
      {io.socket.id === painter ? <WordChoice /> : null}
      <section>
        <Timer ref={timerRef} />
        <WordPreview
          openLetter={questionWord.openLetter}
          wordLength={questionWord.wordLength}
          openIndex={questionWord.openIndex}
        />
      </section>
      <DrawingPlayGround canvasSize={{ width: 800, height: 600 }} />
    </CanvasSectionStyle>
  );
};

export default CanvasSection;
