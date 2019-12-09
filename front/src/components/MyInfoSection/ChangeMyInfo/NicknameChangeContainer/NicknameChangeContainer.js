import React, { useContext, useState, useReducer } from 'react';
import GlobalContext from 'global.context';
import {
  NicknameChangeContainerStyle,
  ResultTextStyle,
} from './NicknameChangeContainer.style';
import NicknameChange from './NicknameChange';

const resultTextReducer = (state, action) => {
  switch (action.type) {
    case 'init':
      return '닉네임을 입력해보세요';
    case 'loading':
      return '잠시만 기다려주세요';
    case 'error':
      return '에러가 발생했어요';
    case 'usable':
      return `"${action.nickname}" 닉네임은 사용가능해요!`;
    case 'notUsable':
      return `"${action.nickname}" 닉네임은 누군가가 사용중이에요`;
    case 'completeChange':
      return `"${action.nickname}"닉네임으로 변경완료!`;
    default:
      throw new Error();
  }
};

export default function NicknameChangeContainer() {
  const { user } = useContext(GlobalContext);
  const [nickname, setNickname] = useState(user.nickname);
  const [resultText, resultTextDispatch] = useReducer(resultTextReducer, '.');

  return (
    <NicknameChangeContainerStyle>
      <NicknameChange
        type="text"
        nickname={nickname}
        setNickname={setNickname}
        userNickname={user.nickname}
        resultTextDispatch={resultTextDispatch}
      />
      <ResultTextStyle>{resultText}</ResultTextStyle>
    </NicknameChangeContainerStyle>
  );
}
