import React, { useContext, useState } from 'react';
import {
  NicknameChangeContainerStyle,
  ResultTextStyle,
} from './NicknameChangeContainer.style';
import GlobalContext from '../../../global.context';
import NicknameChange from './NicknameChange';

function NicknameChangeContainer() {
  const { user } = useContext(GlobalContext);
  const [nickname, setNickname] = useState(user.nickname);
  const [resultText, setResultText] = useState('닉네임을 입력해보세요');

  return (
    <NicknameChangeContainerStyle>
      <NicknameChange
        type="text"
        nickname={nickname}
        setNickname={setNickname}
        userNickname={user.nickname}
        setResultText={setResultText}
      />
      <ResultTextStyle>{resultText}</ResultTextStyle>
    </NicknameChangeContainerStyle>
  );
}

export default NicknameChangeContainer;
