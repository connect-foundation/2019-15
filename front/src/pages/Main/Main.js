import React, { useState, useEffect, useContext } from 'react';
import GlobalContext from '../../global.context';
import checkAuth from '../../logics/auth/checkAuth';
import MainPage from './MainPage';
import { connectSocket } from '../../logics/socketLogic/online';
import Room from '../../logics/room';

const Main = () => {
  const { setOnlineSocket, io, setRoom, userDispatch } = useContext(
    GlobalContext,
  );
  const [nickName, setNickName] = useState('');

  useEffect(() => {
    const initSocket = async () => {
      await io.connectSocket();
      const socket = await connectSocket();
      await io.initConnectMsgHandler({ setRoom });
      setOnlineSocket(socket);
      setRoom(new Room());
    };
    checkAuth(setNickName);
    initSocket();
  }, [io, setOnlineSocket, setRoom, userDispatch]);

  return <MainPage nickName={nickName} />;
};

export default Main;
