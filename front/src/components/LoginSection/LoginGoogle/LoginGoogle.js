import React from 'react';
import LoginGoogleStyle from './LoginGoogle.style';
import GLogo from './GLogo/GLogo';

const LoginGoogle = () => {
  // logics으로 분리 예정
  function loginByGoogle() {
    window.location.href = `${process.env.REACT_APP_LOCAL_API_URI}/auth/google/login`;
  }

  return (
    <LoginGoogleStyle onClick={loginByGoogle}>
      <GLogo />
      <span> google 계정으로 로그인</span>
    </LoginGoogleStyle>
  );
};

export default LoginGoogle;
