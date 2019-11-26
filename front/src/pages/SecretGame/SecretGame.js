import React, { useEffect, useContext } from 'react';
import GlobalContext from '../../global.context';
import GamePreparation from './GamePreparation';
import Room from '../../logics/room';

const roomType = '비밀방';

const SecretGame = () => {
  const { io, user, setRoom } = useContext(GlobalContext);
  useEffect(() => {
    async function init() {
      const { nickname } = user;
      const roomId = window.location.href.split('secret:')[1];
      await io.connectSocket();
      io.requestMakeSecretRoom({ nickname, roomId });
      setRoom(Room(roomType, roomId));
    }
    init();
  }, [io, setRoom, user]);

  return <GamePreparation />;
};

export default SecretGame;
