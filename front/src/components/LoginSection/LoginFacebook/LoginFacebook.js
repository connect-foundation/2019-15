import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import LoginFacebookStyle from './LoginFacebook.style';

const LoginFacebook = () => (
  <LoginFacebookStyle>
    <FontAwesomeIcon icon={faFacebookSquare} />
    <span> facebook 계정으로 로그인</span>
  </LoginFacebookStyle>
);

export default LoginFacebook;
