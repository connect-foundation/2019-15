import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import GlobalContext from 'global.context';
import GamePlayContext from 'components/GamePlay/GamePlay.context';
import { startSecretGame } from 'logics/socketLogic';
import {
  SettingStyle,
  RoomSettingStyle,
  UserSettingStyle,
  GameStartButtonStyle,
} from './Setting.style';

export default function Setting() {
  const { gameSocket } = useContext(GlobalContext);
  const history = useHistory();
  function onClickGameStart() {
    history.push('');
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
