import React from 'react';
import LoginFacebook from './LoginFacebook/LoginFacebook';
import LoginGoogle from './LoginGoogle/LoginGoogle';
import AutoLogin from './AutoLogin/AutoLogin';
import LoginSectionStyle from './LoginSection.style';

const LoginSection = () => (
  <LoginSectionStyle className="login-section">
    <LoginFacebook />
    <LoginGoogle />
    <AutoLogin />
  </LoginSectionStyle>
);

export default LoginSection;
