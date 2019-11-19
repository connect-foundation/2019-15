import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ButtonContainerStyle, NavImage } from './ButtonContainer.style';
import MainContext from '../../../Main.context';

import APP_URI from '../../../util/uri';
import Button from './Button/Button';
import NOTICE from '../../../asset/notice.png';
import MYPAGE from '../../../asset/mypage.png';
import LOGOUT from '../../../asset/logout.png';

const ButtonContainer = () => {
  const { room } = useContext(MainContext);
  // logics 로 분리예정
  function logout() {
    window.location.href = `${APP_URI.REACT_APP_API_URI}/auth/logout`;
  }
  return (
    <ButtonContainerStyle visible={room.roomType}>
      {Button(<NavImage src={NOTICE} />)}
      {Button(
        <Link to="mypage">
          <NavImage src={MYPAGE} />
        </Link>,
      )}
      {Button(<NavImage src={LOGOUT} onClick={logout} />)}
    </ButtonContainerStyle>
  );
};

export default ButtonContainer;
