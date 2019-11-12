import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';

const LoginFacebookStyle = styled.button`
  width: 20rem;
  height: 3rem;
  color: white;
  background-color: #4267b2;
  border-radius: 5px;
  text-align: center;
  font-size: 1.5rem;
  margin: 0.5rem;
`;

const LoginFacebook = () => (
  <LoginFacebookStyle>
    <FontAwesomeIcon icon={faFacebookSquare} />
    <span> facebook 계정으로 로그인</span>
  </LoginFacebookStyle>
);

export default LoginFacebook;
