import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import mainlogo from 'asset/mainlogo_yellowpink.png';
import DefaultNavBtnContainer from 'components/NavigationBar/DefaultNavBtnContainer/DefaultNavBtnContainer';
import GameNavBtnContainer from 'components/NavigationBar/GameNavBtnContainer/GameNavBtnContainer';
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
          <SmallLogoImage src={mainlogo} />
        )}
      </Link>
      {location.pathname.includes('gameplay') ? (
        <GameNavBtnContainer />
      ) : (
        <DefaultNavBtnContainer />
      )}
    </NavigationBarStyle>
  );
}
