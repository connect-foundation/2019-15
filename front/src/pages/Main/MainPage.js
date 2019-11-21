import React from 'react';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import RoomSelectSection from '../../components/RoomSelectSection/RoomSelectSection';
import FriendsSection from '../../components/FriendsSection/FriendsSection';
import MainPageStyle from './MainPage.style';

const MainPage = () => (
  <>
    <NavigationBar />
    <MainPageStyle id={'MainPage'}>
      <RoomSelectSection />
      <FriendsSection />
    </MainPageStyle>
  </>
);

export default MainPage;
