import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import APP_URI from 'util/uri';
import {
  faUserAlt,
  faHome,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import Notice from 'components/NavigationBar/DefaultNavBtnContainer/Notice/Notice';
import {
  NavBtnContainerStyle,
  NavImageStyle,
} from 'components/NavigationBar/DefaultNavBtnContainer/DefaultNavBtnContainer.style';
import Invitation from 'components/NavigationBar/DefaultNavBtnContainer/Invitation/Invitation';

export default function DefaultNavBtnContainer() {
  const location = useLocation();
  const logout = () => {
    window.location.href = `${APP_URI.REACT_APP_API_URI}/auth/logout`;
  };

  return (
    <NavBtnContainerStyle>
      <Invitation />
      <Notice />
      {location.pathname.includes('mypage') ? (
        <Link to="main">
          <NavImageStyle icon={faHome} />
        </Link>
      ) : (
        <Link to="mypage">
          <NavImageStyle icon={faUserAlt} />
        </Link>
      )}
      <NavImageStyle icon={faSignOutAlt} onClick={logout} />
    </NavBtnContainerStyle>
  );
}
