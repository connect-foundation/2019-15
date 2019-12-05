import React from 'react';
import { Link } from 'react-router-dom';
import APP_URI from 'util/uri';
import { faUserAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Notice from 'components/NavigationBar/DefaultNavBtnContainer/Notice/Notice';
import {
  NavBtnContainerStyle,
  NavImageStyle,
} from 'components/NavigationBar/DefaultNavBtnContainer/DefaultNavBtnContainer.style';

export default function DefaultNavBtnContainer() {
  const logout = () => {
    window.location.href = `${APP_URI.REACT_APP_API_URI}/auth/logout`;
  };

  return (
    <NavBtnContainerStyle>
      <Notice />
      <Link to="mypage">
        <NavImageStyle icon={faUserAlt} />
      </Link>
      <NavImageStyle icon={faSignOutAlt} onClick={logout} />
    </NavBtnContainerStyle>
  );
}
