import React, { useEffect, useContext } from 'react';
import GlobalContext from '../../global.context';
import checkAuth from '../../logics/checkAuth';
import MainPage from './MainPage';
import { connectSocket } from '../../logics/socketLogic/online';

const Main = () => {
  const { setOnlineSocket, io, setRoom, setUser } = useContext(GlobalContext);

  useEffect(() => {
    const initSocket = async () => {
      await io.connectSocket();
      const socket = await connectSocket();
      await io.initConnectMsgHandler({ setRoom });
      setOnlineSocket(socket);
    };
    checkAuth();
    initSocket();
  }, [io, setOnlineSocket, setRoom, setUser]);

  return <MainPage />;
};

export default Main;
