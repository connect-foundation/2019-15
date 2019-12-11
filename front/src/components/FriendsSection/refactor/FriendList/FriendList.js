import React, { useReducer } from 'react';
import Header from 'components/FriendsSection/refactor/FriendList/Header/Header';
import Component from 'components/FriendsSection/refactor/FriendList/Component/Component';
import { FriendListStyle } from 'components/FriendsSection/refactor/FriendList/FriendList.style';

function changeModeReducer(state, action) {
  switch (action.type) {
    case 'toConfig':
      return true;
    case 'toView':
      return false;
    default:
      throw new Error(`${action.type} is wrong action type`);
  }
}

export default function FriendList() {
  const [isConfigMode, changeMode] = useReducer(changeModeReducer, false);

  function changeToViewMode() {
    changeMode({ type: 'toView' });
  }

  function changeToConfigMode() {
    changeMode({ type: 'toConfig' });
  }
  return (
    <FriendListStyle>
      <Header
        isConfigMode={isConfigMode}
        changeToViewMode={changeToViewMode}
        changeToConfigMode={changeToConfigMode}
      />
      <Component isConfigMode={isConfigMode} online />
      <Component isConfigMode={isConfigMode} online={false} />
      <Component isConfigMode={isConfigMode} online />
    </FriendListStyle>
  );
}
