import React, { useEffect, useContext } from 'react';
import GlobalContext from '../../global.context';
import checkAuth from '../../logics/checkAuth';
import parseCookies from '../../util/cookie';
import User from '../../logics/user';

import MainPage from './MainPage';

const Main = () => {
  const { io, setRoom, setUser } = useContext(GlobalContext);

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

  return <MainPage />;
};

export default Main;
