import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
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
  const history = useHistory();

  const moveMain = () => history.replace('/main');

  return (
    <NavigationBarStyle id="NavigationBar">
      {location.pathname.includes('main') ? (
        <LogoImage src={mainlogo} />
      ) : (
        <SmallLogoImage
          onClick={moveMain}
          pathname={location.pathname}
          src={mainlogo}
        />
      )}
      {location.pathname.includes('public') ||
      location.pathname.includes('private') ? (
        <GameNavBtnList />
      ) : (
        <DefaultNavBtnList />
      )}
    </NavigationBarStyle>
  );
}
