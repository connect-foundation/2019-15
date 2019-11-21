import React, { useContext, useEffect } from 'react';
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
    <div>
      <div>그림판</div>
    </div>
  );
};

export default Canvas;
