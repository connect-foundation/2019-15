import React, { useEffect, useContext } from 'react';
import GlobalContext from 'global.context';
import checkAuth from 'logics/auth/checkAuth';
import { connectSocket } from 'logics/socketLogic/online';
import Room from 'logics/room';
import NavigationBar from 'components/NavigationBar/NavigationBar';
import Background from 'components/globalComponents/Container/Background.style';
import RoomSelectSection from 'components/RoomSelectSection/RoomSelectSection';
import FriendsSection from 'components/FriendsSection/FriendsSection';

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

  return (
    <>
      <NavigationBar />
      <Background id="MainPage">
        <RoomSelectSection />
        <FriendsSection />
      </Background>
    </>
  );
};

export default Main;
