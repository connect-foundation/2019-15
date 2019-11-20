import React, { useEffect, useContext } from 'react';
import MainContext from '../../Main.context';
import checkAuth from '../../logics/checkAuth';
import Loading from '../../components/globalComponents/Loading/Loading';

import GamePlay from './GamePlay';
import MainPage from './MainPage';

const Main = () => {
  const { io, userlist, setUserlist, room, setRoom } = useContext(MainContext);

  useEffect(() => {
    const initSocket = async () => {
      await io.connectSocket();
      await io.initMsgHandler({ setUserlist, setRoom });
    };
    checkAuth();
    initSocket();
  }, [io, setRoom, setUserlist]);

  // 메인 화면
  if (room.roomType === null) {
    return <MainPage />;
  }

  // 혼자일 경우 게임 대기
  if (userlist.length <= 1) {
    return <Loading />;
  }

  // 게임 화면
  return <GamePlay />;
};

export default Main;
