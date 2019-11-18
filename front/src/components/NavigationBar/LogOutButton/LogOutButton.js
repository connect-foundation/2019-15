import React from 'react';
import Button from '../../globalComponents/Button/Button';
import APP_URI from '../../../uri'

const LogOutButton = () => {
  // logics로 분리 예정
  function logout() {
    window.location.href = `${APP_URI.REACT_APP_API_URI}/auth/logout`;
  }

  return <Button onClick={logout}>로그아웃</Button>;
};

export default LogOutButton;
