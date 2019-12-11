import React, { useReducer } from 'react';
import Header from 'components/FriendsSection/refactor/FriendList/Header/Header';
import Component from 'components/FriendsSection/refactor/FriendList/Component/Component';
import Alert from 'components/globalComponents/Alert/Alert';
import { FriendListStyle } from 'components/FriendsSection/refactor/FriendList/FriendList.style';
import { useQuery } from '@apollo/react-hooks';
import { findFriends } from 'queries/friend';

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
  const { data, loading, error, refetch } = useQuery(findFriends);

  if (loading) {
    return (
      <FriendListStyle>
        <Header />
      </FriendListStyle>
    );
  }
  if (error) {
    return (
      <FriendListStyle>
        <Header />
        <Alert type="error" />
      </FriendListStyle>
    );
  }

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
      {data.friends.map((friend) => (
        <Component
          key={friend.nickname}
          nickname={friend.nickname}
          online={false}
          isConfigMode={isConfigMode}
        />
      ))}
    </FriendListStyle>
  );
}
