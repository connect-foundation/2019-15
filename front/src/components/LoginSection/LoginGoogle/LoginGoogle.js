import React from 'react';
import styled from 'styled-components';
import gLogo from '../../../asset/g-logo.png';

const LoginGoogleStyle = styled.button`
  width: 20rem;
  height: 3rem;
  color: black;
  background-color: #ffffff;
  border-radius: 5px;
  text-align: center;
  font-size: 1.5rem;
  margin: 0.5rem;
  & > img,
  & > span {
    vertical-align: middle;
  }
`;

const GLogoStyle = styled.img`
  height: 80%;
`;

const LoginGoogle = () => (
  <LoginGoogleStyle>
    <GLogoStyle src={gLogo} />
    <span> google 계정으로 로그인</span>
  </LoginGoogleStyle>
);

export default LoginGoogle;
