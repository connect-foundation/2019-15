import React, {useContext, useEffect} from 'react';
import GlobalContext from '../../global.context';
import checkAuth from '../../logics/checkAuth';
import parseCookies from '../../util/cookie';
import User from '../../logics/user';

import GamePlay from './GamePlay';
import MainPage from './MainPage';

const Main = () => {
  const { io, room, setRoom, setUser } = useContext(GlobalContext);

  useEffect(() => {
    const initSocket = async () => {
      await io.connectSocket();
      await io.initConnectMsgHandler({ setRoom });
      const { nickname } = parseCookies();
      setUser(User(nickname));
    };
    checkAuth();
    initSocket();
  }, [io, setRoom, setUser]);

  // 메인 화면
  if (room.roomType === null) {
    return <MainPage />;
  }

  // 게임 화면
  return <GamePlay />;
};

export default Main;
