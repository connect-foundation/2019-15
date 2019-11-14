import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import LoginFacebookStyle from './LoginFacebook.style';

const LoginFacebook = () => {
  // logics으로 분리 예정
  function loginByFacebook() {
    window.location.href = `${process.env.REACT_APP_LOCAL_API_URI}/auth/facebook/login`;
  }

  return (
    <LoginFacebookStyle onClick={loginByFacebook}>
      <FontAwesomeIcon icon={faFacebookSquare} />
      <span> facebook 계정으로 로그인</span>
    </LoginFacebookStyle>
  );
};

export default LoginFacebook;
