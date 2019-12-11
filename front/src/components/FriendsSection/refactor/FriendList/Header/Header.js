import React, { useContext } from 'react';
import { faCog, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import {
  DoneButton,
  Input,
} from 'components/FriendsSection/refactor/FriendList/Header/Header.style';
import {
  ComponentStyle,
  Icon,
} from 'components/FriendsSection/refactor/FriendList/Component/Component.style';

import FriendsSectionContext from 'components/FriendsSection/refactor/FriendsSection.context';

export default function Header({ settingMode, changeSettingMode }) {
  const { dispatchModalContent } = useContext(FriendsSectionContext);

  function switchSettingMode() {
    changeSettingMode(!settingMode);
  }

  function addFriend() {
    dispatchModalContent({ type: 'add', nickname: 'addedOne' });
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
            <Icon icon={faUserPlus} onClick={addFriend} />
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
