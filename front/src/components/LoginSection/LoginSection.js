import React from 'react';
import LoginGoogle from './LoginGoogle/LoginGoogle';
import AutoLogin from './AutoLogin/AutoLogin';
import LoginSectionStyle from './LoginSection.style';

export default function LoginSection() {
  return (
    <LoginSectionStyle className="login-section">
      <LoginGoogle />
      <AutoLogin />
    </LoginSectionStyle>
  );
}
