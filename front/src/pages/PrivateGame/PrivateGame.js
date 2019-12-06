import React, { useEffect, useState, useContext } from 'react';
import GamePlay from 'components/GamePlay/GamePlay';
import Preparation from 'components/Preparation/Preparation';
import GlobalContext from 'global.context';
import { connectGameSocket } from 'logics/socketLogic';

const PrivateGame = () => {
  const [isGamePlaying, setIsGamePlaying] = useState(false);
  const [userList, setUserList] = useState([]);
  const { gameSocket, setGameSocket } = useContext(GlobalContext);

  useEffect(() => {
    if (!gameSocket) {
      const socket = connectGameSocket();
      setGameSocket(socket);
    }
    // 서버에 요청해서 게임중인지 확인
  }, [gameSocket, setGameSocket]);

  if (!isGamePlaying) {
    return (
      <Preparation
        setIsGamePlaying={setIsGamePlaying}
        userList={userList}
        setUserList={setUserList}
      />
    );
  }
  return <GamePlay propUserList={userList} setUserList={setUserList} />;
};

export default PrivateGame;
