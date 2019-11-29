import React, { useEffect, useContext } from 'react';
import GlobalContext from '../../global.context';
import checkAuth from '../../logics/auth/checkAuth';
import MainPage from './MainPage';
import { connectSocket } from '../../logics/socketLogic/online';
import Room from '../../logics/room';

const Main = () => {
  const { setOnlineSocket, io, setRoom, userDispatch } = useContext(
    GlobalContext,
  );

  useEffect(() => {
    const initSocket = async () => {
      await io.connectSocket();
      const socket = await connectSocket();
      await io.initConnectMsgHandler({ setRoom });
      setOnlineSocket(socket);
      setRoom(new Room());
    };
    checkAuth();
    initSocket();
  }, [io, setOnlineSocket, setRoom, userDispatch]);

  return <MainPage />;
};

export default Main;
