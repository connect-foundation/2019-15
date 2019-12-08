import React, { useState } from 'react';
import FriendsSectionContext from 'components/FriendsSection/FriendsSection.context';
import useOnlineFriends from 'hooks/Online/useOnlineFriends';
import FriendsList from './FriendsList/FriendsList';
import ListPopUpButton from './ListPopUpButton.style';

export default function FriendsSection() {
  const [onlineFriends, onlineFriendsDispatch] = useOnlineFriends();
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
