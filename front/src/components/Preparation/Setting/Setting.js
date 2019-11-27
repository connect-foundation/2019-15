import React from 'react';
import {
  SettingStyle,
  RoomSettingStyle,
  UserSettingStyle,
  GameStartButtonStyle,
} from './Setting.style';

const Setting = () => {
  return (
    <SettingStyle>
      <RoomSettingStyle />
      <UserSettingStyle />
      <GameStartButtonStyle>게임 시작</GameStartButtonStyle>
    </SettingStyle>
  );
};

export default Setting;
