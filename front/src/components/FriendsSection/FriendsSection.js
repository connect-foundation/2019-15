import React, { useState, useReducer } from 'react';
import FriendsSectionContext from 'components/FriendsSection/FriendsSection.context';
import useFriendsOnline from 'hooks/Online/useFriendsOnline';
import FriendsList from './FriendsList/FriendsList';
import ListPopUpButton from './ListPopUpButton.style';

const friendsOnlineReducer = (state, action) => {
  switch (action.type) {
    case 'concat':
      return { ...state, ...action.value };
    default:
      throw new Error('wrong action type');
  }
};

export default function FriendsSection() {
  const [onlineFriends, onlineFriendsDispatch] = useReducer(
    friendsOnlineReducer,
    [],
  );
  useFriendsOnline(onlineFriendsDispatch);

  const [open, setOpen] = useState(false);

  function changeOpen() {
    setOpen((currentOpen) => !currentOpen);
  }

  return (
    <FriendsSectionContext.Provider
      value={{ onlineFriends, onlineFriendsDispatch }}
    >
      {open ? <FriendsList /> : null}
      <ListPopUpButton onClick={changeOpen}>
        {open ? '목록 숨기기' : '친구 목록'}
      </ListPopUpButton>
    </FriendsSectionContext.Provider>
  );
}
