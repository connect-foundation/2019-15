import React from 'react';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import RoomSelectSection from '../../components/RoomSelectSection/RoomSelectSection';
import FriendsSection from '../../components/FriendsSection/FriendsSection';
import Background from '../../components/globalComponents/Container/Background.style';

const MainPage = () => (
  <>
    <NavigationBar />
    <Background id="MainPage">
      <RoomSelectSection />
      <FriendsSection />
    </Background>
  </>
);

export default MainPage;
