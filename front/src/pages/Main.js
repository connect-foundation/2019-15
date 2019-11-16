import React, { useEffect } from 'react';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import RoomSelectSection from '../components/RoomSelectSection/RoomSelectSection';
import io from '../logics/socketLogic';

export const MainSocketContext = React.createContext();

const Main = () => {
  const initSocket = async () => {
    await io.connectSocket();
    await io.initMsgHandler();
  };

  useEffect(() => {
    initSocket();
  }, []);

  return (
    <MainSocketContext.Provider value={{ io }}>
      <NavigationBar />
      <RoomSelectSection />
    </MainSocketContext.Provider>
  );
};

export default Main;
