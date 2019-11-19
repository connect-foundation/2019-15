import React from 'react';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import RoomSelectSection from '../../components/RoomSelectSection/RoomSelectSection';
import FriendsSection from '../../components/FriendsSection/FriendsSection';

const MainPage = () => (
  <>
    <NavigationBar />
    <RoomSelectSection />
    <FriendsSection />
  </>
);

export default MainPage;
