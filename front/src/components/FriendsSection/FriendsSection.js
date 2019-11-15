import React from 'react';
import { useState } from 'react';
import FriendsList from './FriendsList/FriendsList';
import ListPopUpButtonStyle from './ListPopUpButton.style';

const FriendsSection = (props) => {
  const [open, setOpen] = useState('none');

  function changeOpen() {
    if (open === 'none') setOpen('block');
    else setOpen('none');
  }

  return (
    <>
      <FriendsList isVisible={open} />
      <ListPopUpButtonStyle onClick={changeOpen}>
        {open === 'none' ? '친구 목록' : '목록 숨기기'}
      </ListPopUpButtonStyle>
    </>
  );
};

export default FriendsSection;
