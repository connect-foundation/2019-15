import React, { useState, useReducer } from 'react';
import useOnlineFriends from 'hooks/Online/useOnlineFriends';
import FriendsSectionContext from 'components/FriendsSection/refactor/FriendsSection.context';
import { ListPopUpButton } from 'components/FriendsSection/refactor/FriendsSection.style';
import FriendList from 'components/FriendsSection/refactor/FriendList/FriendList';
import FriendModal from 'components/FriendsSection/refactor/FriendModal/FriendModal';

function modalReducer(state, action) {
  switch (action.type) {
    case 'clear':
      return { ...state, content: null };
    case 'delete':
      return { ...state, content: `${action.nickname}님을 삭제하시겠습니까?` };
    case 'add':
      if (!action.nickname)
        return { ...state, content: '친구의 닉네임을 입력해주세요' };
      return { ...state, content: `${action.nickname}님을 추가하시겠습니까?` };
    default:
      throw new Error();
  }
}

function switchListOpenReducer(state, action) {
  return !action.current;
}

export default function FriendsSection() {
  const [onlineFriends, onlineFriendsDispatch] = useOnlineFriends();
  const [modalContent, dispatchModalContent] = useReducer(modalReducer, {
    content: null,
    nickname: null,
  });
  const [listOpen, dispatchListOpen] = useReducer(switchListOpenReducer, false);

  function switchListOpen() {
    dispatchListOpen({ current: listOpen });
  }

  return (
    <FriendsSectionContext.Provider
      value={{
        onlineFriends,
        onlineFriendsDispatch,
        modalContent,
        dispatchModalContent,
      }}
    >
      <FriendModal modalContent={modalContent} />
      {listOpen ? <FriendList /> : null}
      <ListPopUpButton onClick={switchListOpen}>
        {listOpen ? '목록 숨기기' : '친구 목록'}
      </ListPopUpButton>
    </FriendsSectionContext.Provider>
  );
}
