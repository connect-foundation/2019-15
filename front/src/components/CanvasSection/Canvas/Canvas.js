import React, { useContext, useEffect } from 'react';
import CanvasStyle from './Canvas.style';
import GamePlayContext from '../../pages/Main/GamePlay.context';
import GlobalContext from '../../global.context';

const Canvas = () => {
  const { painter } = useContext(GamePlayContext);
  const { io } = useContext(GlobalContext);

  useEffect(() => {
    if (io.socket.id === painter) {
      return console.log('그릴 차례입니다');
    }

    return console.log('문제를 맞춰보세요');
  }, [io.socket.id, painter]);

  return (
    <CanvasStyle>
      <div>그림판</div>
    </CanvasStyle>
  );
};

export default Canvas;
