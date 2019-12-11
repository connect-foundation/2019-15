import React, { useContext, useState, useCallback } from 'react';
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
import regex from 'constant/TextInput';

export default function Header({
  isConfigMode,
  changeToViewMode,
  changeToConfigMode,
}) {
  const { dispatchModalContent } = useContext(FriendsSectionContext);
  const [inputValue, setValue] = useState('');

  const inputChangeHandler = useCallback(
    (e) => {
      if (regex.test(e.target.value)) {
        setValue(e.target.value);
      }
    },
    [setValue],
  );

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
            <Input onChange={inputChangeHandler} value={inputValue} />
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
