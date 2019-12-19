import React from 'react';
import APP_URI from 'constants/uri';
import LoginGoogleStyle from './LoginGoogle.style';
import GLogo from './GLogo/GLogo';

export default function LoginGoogle() {
  const loginByGoogle = () => {
    window.location.href = `${APP_URI.REACT_APP_API_URI}/auth/google/login`;
  };

  return (
    <LoginGoogleStyle onClick={loginByGoogle}>
      <GLogo />
      <span> google 계정으로 로그인</span>
    </LoginGoogleStyle>
  );
}
