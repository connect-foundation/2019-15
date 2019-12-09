import React, { useEffect, useContext, useState } from 'react';
import GlobalContext from 'global.context';
import GamePlay from 'components/GamePlay/GamePlay';
import GamePlayContext from 'components/GamePlay/GamePlay.context';
import {
  connectGameSocket,
  emitMakePrivateRoom,
  initStartPrivateGameHandler,
} from 'logics/socketLogic';

import Room from 'logics/room';
import { PRIVATE_ROOM_NAME } from 'constant/room/roomInfo';

export default function PrivateGame() {
  const { gameSocket, user, setRoom } = useContext(GlobalContext);
  const { setUserList, setPainter } = useContext(GamePlayContext);

  useEffect(() => {
    async function init() {
      const { nickname } = user;
      const roomId = window.location.href.split('private:')[1];
      setUserList([]);
      connectGameSocket(gameSocket);
      emitMakePrivateRoom(gameSocket, { nickname, roomId });
      initStartPrivateGameHandler(gameSocket, { setPainter });
      setRoom(new Room(roomId, PRIVATE_ROOM_NAME));
    }
    init();
  }, [gameSocket, setPainter, setRoom, setUserList, user]);

  return <GamePlay />;
}
