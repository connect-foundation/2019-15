import React, { useReducer } from 'react';
import useOnlineFriends from 'hooks/Online/useOnlineFriends';
import FriendsSectionContext from 'components/FriendsSection/refactor/FriendsSection.context';
import { ListPopUpButton } from 'components/FriendsSection/refactor/FriendsSection.style';
import FriendList from 'components/FriendsSection/refactor/FriendList/FriendList';

function switchListOpenReducer(state, action) {
  return !action.current;
}

export default function FriendsSection() {
  const [onlineFriends, onlineFriendsDispatch] = useOnlineFriends();
  const [listOpen, dispatchListOpen] = useReducer(switchListOpenReducer, false);

  function switchListOpen() {
    dispatchListOpen({ current: listOpen });
  }

  return (
    <FriendsSectionContext.Provider
      value={{
        onlineFriends,
        onlineFriendsDispatch,
      }}
    >
      {listOpen ? <FriendList /> : null}
      <ListPopUpButton onClick={switchListOpen}>
        {listOpen ? '목록 숨기기' : '친구 목록'}
      </ListPopUpButton>
    </FriendsSectionContext.Provider>
  );
}
