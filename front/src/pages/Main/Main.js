import React, { useEffect, useContext } from 'react';
import GlobalContext from '../../global.context';
import checkAuth from '../../logics/checkAuth';
import MainPage from './MainPage';
import Room from '../../logics/room';

const Main = () => {
  const { io, setRoom, setUser } = useContext(GlobalContext);

  useEffect(() => {
    const initSocket = async () => {
      await io.connectSocket();
      await io.initConnectMsgHandler({ setRoom });
      setRoom(new Room());
    };
    checkAuth();
    initSocket();
  }, [io, setRoom, setUser]);

  return <MainPage />;
};

export default Main;
