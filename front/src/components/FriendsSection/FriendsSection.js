import React, { useState, useReducer } from 'react';
import FriendsSectionContext from 'components/FriendsSection/FriendsSection.context';
import useFriendsOnline from 'hooks/Online/useFriendsOnline';
import useFriendsOffline from 'hooks/Online/useFriendsOffline';
import FriendsList from './FriendsList/FriendsList';
import ListPopUpButton from './ListPopUpButton.style';

const friendsOnlineReducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case 'add':
      return { ...state, ...action.value };
    case 'delete':
      return { ...state, [action.value.id]: null };
    default:
      throw new Error('wrong action type');
  }
};

export default function FriendsSection() {
  const [onlineFriends, onlineFriendsDispatch] = useReducer(
    friendsOnlineReducer,
    {},
  );

  useFriendsOnline(onlineFriendsDispatch);
  useFriendsOffline(onlineFriendsDispatch);

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
