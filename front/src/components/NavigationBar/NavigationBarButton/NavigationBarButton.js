import React from 'react';
import Button from '../../globalComponents/Button/Button';

const NavigationBarButton = () => {
  // logics로 분리 예정
  function logout() {
    window.location.href = `${process.env.REACT_APP_LOCAL_API_URI}/auth/logout`;
  }

  return <Button onClick={logout}>로그아웃</Button>;
};

export default NavigationBarButton;
