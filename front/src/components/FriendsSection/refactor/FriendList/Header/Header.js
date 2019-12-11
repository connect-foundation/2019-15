import React, { useContext, useState } from 'react';
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
  const [inputValue, setValue] = useState('');

  function inputChangeHandler(e) {
    setValue(e.target.value);
  }

  function switchSettingMode() {
    changeSettingMode(!settingMode);
  }

  function addFriend() {
    dispatchModalContent({ type: 'add', nickname: inputValue });
  }

  return (
    <>
      {settingMode ? (
        <>
          <ComponentStyle>
            <DoneButton onClick={switchSettingMode}>완료</DoneButton>
          </ComponentStyle>
          <ComponentStyle>
            <Input onChange={inputChangeHandler} />
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
