import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { ButtonContainerStyle, NavImage, Text } from './ButtonContainer.style';
import GlobalContext from '../../../global.context';
import APP_URI from '../../../util/uri';
import Button from './Button/Button';
import NOTICE from '../../../asset/notice.png';
import MYPAGE from '../../../asset/mypage.png';
import LOGOUT from '../../../asset/logout.png';

import Messages from '../../Messages/Messages';
import Room from '../../../logics/room';

const ButtonContainer = () => {
  const [openNotice, setOpenNotice] = useState(false);
  const { io, user, room, setRoom } = useContext(GlobalContext);

  // logics 로 분리예정
  function logout() {
    window.location.href = `${APP_URI.REACT_APP_API_URI}/auth/logout`;
  }

  function switchNotice() {
    setOpenNotice((cur) => !cur);
  }

  async function onClickExit() {
    const { nickname } = user;
    const { roomType, roomId } = room;
    await io.exitGameRoom({ nickname, roomType, roomId });
    setRoom(Room());
  }

  if (room.roomType === null) {
    return (
      <ButtonContainerStyle>
        {Button(<NavImage src={NOTICE} onClick={switchNotice} />)}
        {openNotice ? <Messages /> : null}

        {Button(
          <Link to="mypage">
            <NavImage src={MYPAGE} />
          </Link>,
        )}
        {Button(<NavImage src={LOGOUT} onClick={logout} />)}
      </ButtonContainerStyle>
    );
  }

  return (
    <Link to="main" onClick={onClickExit}>
      <ButtonContainerStyle>
        <Text>나가기</Text>
      </ButtonContainerStyle>
    </Link>
  );
};

export default ButtonContainer;
