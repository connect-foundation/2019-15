import React, { useContext } from 'react';
import {
  SettingStyle,
  RoomSettingStyle,
  UserSettingStyle,
  GameStartButtonStyle,
} from './Setting.style';
import GlobalContext from '../../../global.context';
import GamePlayContext from '../../../GamePlay.context';

const Setting = () => {
  const { io, room } = useContext(GlobalContext);
  const { userList } = useContext(GamePlayContext);

  function onClickGameStart() {
    const { roomType, roomId } = room;
    if (userList.length >= 2) {
      io.startSecretGame({ roomType, roomId });
    }
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
};

export default Setting;
