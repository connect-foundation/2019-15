import React, { useState, useCallback } from 'react';
import { faCog, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import {
  DoneButton,
  Input,
} from 'components/FriendsSection/FriendList/Header/Header.style';
import regex from 'constants/nicknameRegex';
import PropTypes from 'prop-types';
import {
  Icon,
  ComponentStyle,
} from 'components/FriendsSection/FriendList/Component/Component.style';

Header.propTypes = {
  isConfigMode: PropTypes.bool,
  switchMode: PropTypes.func,
  dispatchModalContent: PropTypes.func,
};

Header.defaultProps = {
  isConfigMode: false,
  switchMode: null,
  dispatchModalContent: null,
};

export default function Header({
  isConfigMode,
  switchMode,
  dispatchModalContent,
}) {
  const [inputValue, setValue] = useState('');

  const inputChangeHandler = useCallback(
    (e) => {
      if (regex.test(e.target.value)) {
        setValue(e.target.value);
      }
    },
    [setValue],
  );

  const addFriend = () => {
    dispatchModalContent({ type: 'addRequest', nickname: inputValue });
  };

  return (
    <>
      {isConfigMode ? (
        <>
          <ComponentStyle>
            <DoneButton onClick={switchMode}>완료</DoneButton>
          </ComponentStyle>
          <ComponentStyle>
            <Input onChange={inputChangeHandler} value={inputValue} />
            <Icon icon={faUserPlus} onClick={addFriend} />
          </ComponentStyle>
        </>
      ) : (
        <ComponentStyle>
          <span>친구 목록</span>
          <Icon icon={faCog} onClick={switchMode} />
        </ComponentStyle>
      )}
    </>
  );
}
