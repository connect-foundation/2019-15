import React, { useEffect } from 'react';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import RoomSelectSection from '../components/RoomSelectSection/RoomSelectSection';
import checkAuth from '../logics/checkAuth';

const Main = () => {
  useEffect(checkAuth, []);

  return (
    <>
      <NavigationBar />
      <RoomSelectSection />
    </>
  );
};

export default Main;
