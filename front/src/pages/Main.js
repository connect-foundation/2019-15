import React, { useEffect } from 'react';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import RoomSelectSection from '../components/RoomSelectSection/RoomSelectSection';
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
  );
};

export default Main;
