import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import GlobalContext from 'global.context';
import Room from 'logics/room';
import { PRIVATE_ROOM_NAME } from 'constant/room/roomInfo';
import {
  SettingStyle,
  UserSettingStyle,
  GameStartButtonStyle,
  Nickname,
} from './Setting.style';

export default function Setting() {
  const { setRoom, room } = useContext(GlobalContext);
  const history = useHistory();

  useEffect(() => {
    const privateRoomId = window.location.hash.split('setting:')[1];
    setRoom(new Room(privateRoomId, PRIVATE_ROOM_NAME));
  }, [setRoom]);

  function onClickGameStart() {
    history.push(`waiting:${room.roomId}`);
  }

  return (
    <SettingStyle>
      <UserSettingStyle>
        <Nickname />
      </UserSettingStyle>
      <GameStartButtonStyle onClick={onClickGameStart}>
        게임 시작
      </GameStartButtonStyle>
    </SettingStyle>
  );
}
