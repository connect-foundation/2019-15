import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useLazyQuery } from '@apollo/react-hooks';
import { CHECK_NICKNAME_AVAILABLE } from 'queries/user';
import TextInput from 'components/globalComponents/TextInput/TextInput';
import NicknameChangeBtn from './NicknameChangeBtn';
import { NicknameChangeStyle } from './NicknameChange.style';

NicknameChange.propTypes = {
  userNickname: PropTypes.string,
  nickname: PropTypes.string.isRequired,
  setNickname: PropTypes.func,
  resultTextDispatch: PropTypes.func,
};

NicknameChange.defaultProps = {
  userNickname: null,
  setNickname: () => {},
  resultTextDispatch: () => {},
};

export default function NicknameChange({
  nickname,
  setNickname,
  userNickname,
  resultTextDispatch,
}) {
  const [disabled, setDisabled] = useState(false);
  const [checkNicknameAvailable, { loading, data, error }] = useLazyQuery(
    CHECK_NICKNAME_AVAILABLE,
  );

  if (loading) {
    resultTextDispatch({ type: 'loading' });
  }
  if (error) {
    resultTextDispatch({ type: 'error' });
  }

  useEffect(() => {
    if (!data || !data.checkNicknameAvailable) {
      return;
    }
    const { nickname: nicknameChecked, result } = data.checkNicknameAvailable;

    resultTextDispatch({
      type: `${result ? 'usable' : 'notUsable'}`,
      nickname: nicknameChecked,
    });
  }, [data, resultTextDispatch]);

  useEffect(() => {
    if (!data || !data.checkNicknameAvailable) {
      setDisabled(true);
    } else {
      const { result } = data.checkNicknameAvailable;
      if (result) setDisabled(false);
      else setDisabled(true);
    }

    return () => {
      setDisabled(true);
    };
  }, [data, nickname, userNickname]);

  const checkNickname = (input) => {
    checkInputNicknameAvailable(input);
    checkSelfNickname(input);
  };

  const checkInputNicknameAvailable = useCallback(
    (input) => {
      if (input && input !== userNickname) {
        checkNicknameAvailable({
          variables: {
            nickname: input,
          },
        });
      }
    },
    [checkNicknameAvailable, userNickname],
  );

  const checkSelfNickname = useCallback(
    (input) => {
      if (input === userNickname) {
        setDisabled(true);
        resultTextDispatch({ type: 'init' });
      }
    },
    [resultTextDispatch, userNickname],
  );

  const onInputChange = useCallback(
    (e) => {
      setDisabled(true);
      setNickname(e.target.value);
    },
    [setNickname],
  );

  return (
    <NicknameChangeStyle>
      <TextInput
        type="text"
        value={nickname}
        onChange={onInputChange}
        onChangeComplete={checkNickname}
      />
      <NicknameChangeBtn
        newNickname={nickname}
        resultTextDispatch={resultTextDispatch}
        loading={loading}
        disabled={disabled}
      />
    </NicknameChangeStyle>
  );
}
