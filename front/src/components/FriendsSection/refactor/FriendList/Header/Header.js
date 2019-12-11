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

export default function Header({
  isConfigMode,
  changeToViewMode,
  changeToConfigMode,
}) {
  const { dispatchModalContent } = useContext(FriendsSectionContext);
  const [inputValue, setValue] = useState('');

  function inputChangeHandler(e) {
    setValue(e.target.value);
  }

  function addFriend() {
    dispatchModalContent({ type: 'add', nickname: inputValue });
  }

  return (
    <>
      {isConfigMode ? (
        <>
          <ComponentStyle>
            <DoneButton onClick={changeToViewMode}>완료</DoneButton>
          </ComponentStyle>
          <ComponentStyle>
            <Input onChange={inputChangeHandler} />
            <Icon icon={faUserPlus} onClick={addFriend} />
          </ComponentStyle>
        </>
      ) : (
        <ComponentStyle>
          <span>친구 목록</span>
          <Icon icon={faCog} onClick={changeToConfigMode} />
        </ComponentStyle>
      )}
    </>
  );
}
