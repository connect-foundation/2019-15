import React, { useContext } from 'react';
import GlobalContext from 'global.context';
import GamePlayContext from 'GamePlay.context';
import {
  SettingStyle,
  RoomSettingStyle,
  UserSettingStyle,
  GameStartButtonStyle,
} from './Setting.style';

export default function Setting() {
  const { io, room, user } = useContext(GlobalContext);
  const { userList } = useContext(GamePlayContext);

  function onClickGameStart() {
    const { roomType, roomId } = room;
    if (userList.length < 2) return;

    if (!user.roomOwner) return;

    io.startSecretGame({ roomType, roomId });
  }

  return (
    <SettingStyle>
      <RoomSettingStyle />
      <UserSettingStyle />
      <GameStartButtonStyle onClick={onClickGameStart}>
        게임 시작
      </GameStartButtonStyle>
    </SettingStyle>
  );
}
