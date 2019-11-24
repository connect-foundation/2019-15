import React, { useContext, useEffect } from 'react';
import Canvas from './Canvas/Canvas';
import WordChoice from './WordChoice/WordChoice';
import CanvasSectionStyle from './CanvasSection.style';
import GamePlayContext from '../../pages/Main/GamePlay.context';
import GlobalContext from '../../global.context';

const CanvasSection = () => {
  const { painter } = useContext(GamePlayContext);
  const { io } = useContext(GlobalContext);

  useEffect(() => {
    if (io.socket.id === painter) {
      return console.log('그릴 차례입니다');
    }

    return console.log('문제를 맞춰보세요');
  }, [io.socket.id, painter]);

  return (
    <CanvasSectionStyle>
      {io.socket.id === painter ? <WordChoice /> : null}
      <Canvas />
    </CanvasSectionStyle>
  );
};

export default CanvasSection;
