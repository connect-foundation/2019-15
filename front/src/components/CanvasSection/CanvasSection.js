import React, { useContext } from 'react';
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

  return (
    <CanvasSectionStyle>
      {io.socket.id === painter ? <WordChoice /> : null}
      <section>
        <Timer />
        <WordPreview openLetter="a" wordLength={5} openIndex={3} />
      </section>
      <DrawingPlayGround canvasSize={{ width: 800, height: 600 }} />
    </CanvasSectionStyle>
  );
};

export default CanvasSection;
