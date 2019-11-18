import React, { useEffect } from 'react';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import RoomSelectSection from '../../components/RoomSelectSection/RoomSelectSection';
import FriendsSection from '../../components/FriendsSection/FriendsSection';
import checkAuth from '../../logics/checkAuth';
import io from '../../logics/socketLogic';
import MainSocketContext from './Main.context';

const Main = () => {
  const initSocket = async () => {
    await io.connectSocket();
    await io.initMsgHandler();
  };

  useEffect(() => {
    checkAuth();
    initSocket();
  }, []);

  return (
    <MainSocketContext.Provider value={{ io }}>
      <NavigationBar />
      <RoomSelectSection />
      <FriendsSection />
    </MainSocketContext.Provider>
  );
};

export default Main;
