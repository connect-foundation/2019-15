import React from 'react';
import styled from 'styled-components';
import LoginFacebook from './LoginFacebook/LoginFacebook';
import LoginGoogle from './LoginGoogle/LoginGoogle';
import AutoLogin from './AutoLogin/AutoLogin';

const LoginSectionStyle = styled.section`
  display: flex;
  flex-direction: column;
`;

const LoginSection = () => (
  <LoginSectionStyle className="login-section">
    <LoginFacebook />
    <LoginGoogle />
    <AutoLogin />
  </LoginSectionStyle>
);

export default LoginSection;
