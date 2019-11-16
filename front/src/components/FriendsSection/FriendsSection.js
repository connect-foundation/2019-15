import React from 'react';
import { useState } from 'react';
import FriendsList from './FriendsList/FriendsList';
import ListPopUpButtonStyle from './ListPopUpButton.style';

const FriendsSection = (props) => {
  const [open, setOpen] = useState(false);

  function changeOpen() {
    setOpen(!open);
  }

  return (
    <>
      {open ? <FriendsList /> : null}
      <ListPopUpButtonStyle onClick={changeOpen}>
        {open ? '목록 숨기기' : '친구 목록'}
      </ListPopUpButtonStyle>
    </>
  );
};

export default FriendsSection;
