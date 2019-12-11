import React from 'react';
import { faCog, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import {
  DoneButton,
  Input,
} from 'components/FriendsSection/refactor/FriendList/Header/Header.style';
import {
  ComponentStyle,
  Icon,
} from 'components/FriendsSection/refactor/FriendList/Component/Component.style';

export default function Header({ settingMode, changeSettingMode }) {
  function switchSettingMode() {
    changeSettingMode(!settingMode);
  }
  return (
    <>
      {settingMode ? (
        <>
          <ComponentStyle>
            <DoneButton onClick={switchSettingMode}>완료</DoneButton>
          </ComponentStyle>
          <ComponentStyle>
            <Input />
            <Icon icon={faUserPlus} />
          </ComponentStyle>
        </>
      ) : (
        <ComponentStyle>
          <span>친구 목록</span>
          <Icon icon={faCog} onClick={switchSettingMode} />
        </ComponentStyle>
      )}
    </>
  );
}
