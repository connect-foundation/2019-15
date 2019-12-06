import React, { useEffect, useState } from 'react';
import GamePlay from 'components/GamePlay/GamePlay';
import Preparation from 'components/Preparation/Preparation';

const PrivateGame = () => {
  const [isGamePlaying, setIsGamePlaying] = useState(false);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    // 서버에 요청해서 게임중인지 확인
  }, []);

  if (!isGamePlaying) {
    return <Preparation setIsGamePlaying={setIsGamePlaying} />;
  }
  return <GamePlay propUserList={userList} />;
};

export default PrivateGame;
