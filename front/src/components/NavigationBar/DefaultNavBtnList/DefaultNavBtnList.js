import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import APP_URI from 'util/uri';
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
  const logout = () => {
    window.location.href = `${APP_URI.REACT_APP_API_URI}/auth/logout`;
  };

  return (
    <NavBtnContainerStyle>
      <Notification />
      <InvitationContainer />
      <FriendRequestContainer />
      {location.pathname.includes('main') ? (
        <Link to="mypage">
          <NavImageStyle icon={faUserAlt} />
        </Link>
      ) : (
        <Link to="main">
          <NavImageStyle icon={faHome} />
        </Link>
      )}
      <NavImageStyle icon={faSignOutAlt} onClick={logout} />
    </NavBtnContainerStyle>
  );
}
