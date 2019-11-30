import React, { useEffect, useContext, useState } from 'react';
import GlobalContext from 'global.context';
import SecretGameContext from 'pages/SecretGame/SecretGame.context';
import GamePlay from 'pages/GamePlay/GamePlay';
import GamePlayContext from 'GamePlay.context';

import GamePreparation from 'pages/SecretGame/GamePreparation';
import Room from 'logics/room/index';

const roomType = '비밀방';

const SecretGame = () => {
  const { io, user, setRoom } = useContext(GlobalContext);
  const { setUserList, setPainter } = useContext(GamePlayContext);
  const [isGamePlaying, setIsGamePlaying] = useState(false);

  useEffect(() => {
    async function init() {
      const { nickname } = user;
      const roomId = window.location.href.split('secret:')[1];
      setUserList([]);
      await io.connectSocket();
      io.requestMakeSecretRoom({ nickname, roomId });
      io.initStartSecretGameHandler({ setPainter, setIsGamePlaying });
      setRoom(new Room(roomId, roomType));
    }
    init();
  }, [io, setPainter, setRoom, setUserList, user]);

  if (isGamePlaying) {
    return <GamePlay />;
  }

  return (
    <SecretGameContext.Provider value={{ setIsGamePlaying }}>
      <GamePreparation />
    </SecretGameContext.Provider>
  );
};

export default SecretGame;
