import React, { useReducer } from 'react';
import { ListPopUpButton } from 'components/FriendsSection/FriendsSection.style';
import FriendList from 'components/FriendsSection/FriendList/FriendList';

function switchListOpenReducer(state, action) {
  return !action.current;
}

export default function FriendsSection() {
  const [listOpen, dispatchListOpen] = useReducer(switchListOpenReducer, false);

  const switchListOpen = () => {
    dispatchListOpen({ current: listOpen });
  };

  return (
    <div>
      {listOpen ? <FriendList /> : null}
      <ListPopUpButton onClick={switchListOpen}>
        {listOpen ? '목록 숨기기' : '친구 목록'}
      </ListPopUpButton>
    </div>
  );
}
