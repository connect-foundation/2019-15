import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import APP_URI from 'constants/uri';
import {
  faUserAlt,
  faHome,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import FriendRequestContainer from 'components/NavigationBar/DefaultNavBtnList/FriendRequestContainer/FriendRequestContainer';
import {
  NavBtnContainerStyle,
  NavImageStyle,
} from 'components/NavigationBar/DefaultNavBtnList/DefaultNavBtnList.style';
import InvitationContainer from 'components/NavigationBar/DefaultNavBtnList/InvitationContainer/InvitationContainer';
import Notification from 'components/NavigationBar/DefaultNavBtnList/Notification/Notification';

export default function DefaultNavBtnList() {
  const location = useLocation();
  const history = useHistory();

  const replaceMyPage = () => {
    if (location.pathname.includes('main')) history.push('/mypage');
    else history.replace('/mypage');
  };
  const moveMain = () => history.replace('/main');

  const logout = () => {
    window.location.href = `${APP_URI.REACT_APP_API_URI}/auth/logout`;
  };

  return (
    <NavBtnContainerStyle>
      <Notification />
      <InvitationContainer />
      <FriendRequestContainer />
      {location.pathname.includes('main') ? (
        <NavImageStyle onClick={replaceMyPage} icon={faUserAlt} />
      ) : (
        <NavImageStyle onClick={moveMain} icon={faHome} />
      )}
      <NavImageStyle icon={faSignOutAlt} onClick={logout} />
    </NavBtnContainerStyle>
  );
}
