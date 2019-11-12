import React from 'react';
import LoginGoogleStyle from './LoginGoogle.style';
import GLogo from './GLogo/GLogo';

const LoginGoogle = () => (
  <LoginGoogleStyle>
    <GLogo />
    <span> google 계정으로 로그인</span>
  </LoginGoogleStyle>
);

export default LoginGoogle;
