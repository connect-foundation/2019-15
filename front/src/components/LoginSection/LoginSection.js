import React from 'react';
import LoginGoogle from './LoginGoogle/LoginGoogle';
import AutoLogin from './AutoLogin/AutoLogin';
import LoginSectionStyle from './LoginSection.style';

const LoginSection = () => (
  <LoginSectionStyle className="login-section">
    <LoginGoogle />
    <AutoLogin />
  </LoginSectionStyle>
);

export default LoginSection;
