import React, { useEffect } from 'react';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import RoomSelectSection from '../components/RoomSelectSection/RoomSelectSection';
<<<<<<< .merge_file_q3wjtr
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
=======
import FriendsSection from '../components/FriendsSection/FriendsSection';
import checkAuth from '../logics/checkAuth';

const Main = () => {
  useEffect(checkAuth, []);

  return (
    <>
      <NavigationBar />
      <RoomSelectSection />
      <FriendsSection />
    </>
>>>>>>> .merge_file_37sLBV
  );
};

export default Main;
