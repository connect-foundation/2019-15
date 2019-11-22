import React, {useState} from 'react';
import FriendsList from './FriendsList/FriendsList';
import ListPopUpButton from './ListPopUpButton.style';

const FriendsSection = () => {
  const [open, setOpen] = useState(false);

  function changeOpen() {
    setOpen((currentOpen) => !currentOpen);
  }

  return (
    <>
      {open ? <FriendsList /> : null}
      <ListPopUpButton onClick={changeOpen}>
        {open ? '목록 숨기기' : '친구 목록'}
      </ListPopUpButton>
    </>
  );
};

export default FriendsSection;
