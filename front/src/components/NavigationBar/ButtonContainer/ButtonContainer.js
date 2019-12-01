import React, { useState, useContext, useReducer, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { onRequestFriend } from 'logics/socketLogic/online';
import Room from 'logics/room';

import GlobalContext from 'global.context';

import APP_URI from 'util/uri';
import { faUserAlt, faBell, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Button from './Button/Button';
import { ButtonContainerStyle, NavImage, Text } from './ButtonContainer.style';

import Messages from '../../Messages/Messages';
import Alarm from '../../Alarm/Alarm';

function alarmListReducer(state, action) {
  switch (action.type) {
    case 'push':
      return [...state, action.value];
    case 'pop':
      state.pop();
      return [...state];
    default:
      throw new Error('wrong action type');
  }
}

export default function ButtonContainer() {
  const [alarmList, alarmListDispatch] = useReducer(alarmListReducer, []);
  const [noticeType, setNoticeType] = useState(null);
  const { onlineSocket, io, user, room, setRoom } = useContext(GlobalContext);

  // logics 로 분리예정
  function logout() {
    window.location.href = `${APP_URI.REACT_APP_API_URI}/auth/logout`;
  }

  function setNoticeMessages() {
    setNoticeType((prev) => (prev ? null : 'messages'));
  }

  useEffect(() => {
    const initEvents = async () => {
      if (onlineSocket) {
        onRequestFriend(onlineSocket, { alarmListDispatch, setNoticeType });
      }
    };
    initEvents();
  }, [onlineSocket, setNoticeType]);

  async function onClickExit() {
    const { nickname } = user;
    const { roomType, roomId } = room;
    await io.exitGameRoom({ nickname, roomType, roomId });
    setRoom(new Room());
  }

  if (!room.roomType) {
    let notice;
    if (noticeType === 'alarm') notice = <Alarm alarmList={alarmList} />;
    else if (noticeType === 'messages') notice = <Messages />;
    return (
      <ButtonContainerStyle>
        {Button(<NavImage icon={faBell} onClick={setNoticeMessages} />)}
        {notice}
        {Button(
          <Link to="mypage">
            <NavImage icon={faUserAlt} />
          </Link>
        )}
        {Button(<NavImage icon={faSignOutAlt} onClick={logout} />)}
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
}
