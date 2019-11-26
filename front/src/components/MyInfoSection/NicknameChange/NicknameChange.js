import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useLazyQuery } from '@apollo/react-hooks';
import { checkNicknameAvailableQuery } from '../../../queries/user';
import TextInput from '../../globalComponents/TextInput/TextInput';
import NicknameChangeBtn from './NicknameChangeBtn';
import { NicknameChangeStyle } from './NicknameChange.style';

NicknameChange.propTypes = {
  userNickname: PropTypes.string,
  nickname: PropTypes.string.isRequired,
  setNickname: PropTypes.func,
  setResultText: PropTypes.func,
};

NicknameChange.defaultProps = {
  userNickname: null,
  setNickname: () => {},
  setResultText: () => {},
};

export default function NicknameChange({
  nickname,
  setNickname,
  userNickname,
  setResultText,
}) {
  const [disabled, setDisabled] = useState(true);
  const [checkNicknameAvailable, { loading, data, error }] = useLazyQuery(
    checkNicknameAvailableQuery,
  );

  if (loading) {
    setResultText('잠시만 기다려주세요');
  }
  if (error) {
    setResultText('에러가 발생했어요');
  }

  useEffect(() => {
    if (!data || !data.checkNicknameAvailable) {
      return;
    }
    const { nickname: nicknameChecked, result } = data.checkNicknameAvailable;

    setResultText(
      result
        ? `"${nicknameChecked}" 닉네임은 사용가능해요!`
        : `"${nicknameChecked}" 닉네임은 누군가가 사용중이에요`,
    );
  }, [data, setResultText]);

  useEffect(() => {
    if (!data || !data.checkNicknameAvailable) {
      return;
    }
    const { result } = data.checkNicknameAvailable;
    if (result && nickname !== userNickname) setDisabled(false);
    else setDisabled(true);
  }, [data, nickname, userNickname]);

  const checkNickname = useCallback(
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
        setResultText={setResultText}
        loading={loading}
        disabled={disabled}
      />
    </NicknameChangeStyle>
  );
}
