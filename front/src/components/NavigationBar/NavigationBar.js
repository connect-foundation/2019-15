import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import mainlogo from 'asset/mainlogo_yellowpink.png';
import DefaultNavBtnList from 'components/NavigationBar/DefaultNavBtnList/DefaultNavBtnList';
import GameNavBtnList from 'components/NavigationBar/GameNavBtnList/GameNavBtnList';
import {
  SmallLogoImage,
  LogoImage,
  NavigationBarStyle,
} from './NavigationBar.style';

export default function NavigationBar() {
  const location = useLocation();

  return (
    <NavigationBarStyle id="NavigationBar">
      <Link to="/main">
        {location.pathname.includes('main') ? (
          <LogoImage src={mainlogo} />
        ) : (
          <SmallLogoImage pathname={location.pathname} src={mainlogo} />
        )}
      </Link>
      {location.pathname.includes('public') ||
        location.pathname.includes('private') ? (
          <GameNavBtnList />
        ) : (
          <DefaultNavBtnList />
        )}
    </NavigationBarStyle>
  );
}
