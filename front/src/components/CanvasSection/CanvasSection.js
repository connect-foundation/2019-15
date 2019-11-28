import React, { useState, useContext, useEffect } from 'react';
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
  const [drawable, setDrawable] = useState(false);

  const [isTimerStart, setIsTimerStart] = useState(false);

  io.setStartQuestionHandler(setQuestionWord, () => {
    setIsTimerStart(true);
  });

  useEffect(() => {
    if (painter === io.socket.id) {
      setDrawable(true);
    }
  }, [drawable, io.socket.id, painter]);

  return (
    <CanvasSectionStyle>
      {io.socket.id === painter ? <WordChoice /> : null}
      <section>
        <Timer isTimerStart={isTimerStart} setIsTimerStart={setIsTimerStart} />
        <WordPreview
          openLetter={questionWord.openLetter}
          wordLength={questionWord.wordLength}
          openIndex={questionWord.openIndex}
        />
      </section>
      <DrawingPlayGround
        drawable={drawable}
        canvasSize={{ width: 800, height: 600 }}
      />
    </CanvasSectionStyle>
  );
};

export default CanvasSection;
