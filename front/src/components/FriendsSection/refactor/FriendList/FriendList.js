import React, { useReducer } from 'react';
import Header from 'components/FriendsSection/refactor/FriendList/Header/Header';
import Component from 'components/FriendsSection/refactor/FriendList/Component/Component';
import Alert from 'components/globalComponents/Alert/Alert';
import {
  FriendListStyle,
  Div,
} from 'components/FriendsSection/refactor/FriendList/FriendList.style';
import { GET_FRIENDS } from 'queries/friend';
import useCursorQuery from 'hooks/useCursorQuery';
import InfinityScroll from 'components/globalComponents/InfinityScroll/InfinityScroll';

function changeModeReducer(state, action) {
  return !action.current;
}

export default function FriendList() {
  const [isConfigMode, changeMode] = useReducer(changeModeReducer, false);
  const { data, loading, error, fetchMore, hasMore } = useCursorQuery(
    GET_FRIENDS,
  );

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

  function switchMode() {
    changeMode({ current: isConfigMode });
  }

  return (
    <FriendListStyle>
      <Header
        isConfigMode={isConfigMode}
        switchMode={switchMode}
      />
      <InfinityScroll loadMore={fetchMore} hasMore={hasMore}>
        <Div>
          {data.map(({ sFriend: { nickname } }) => (
            <Component
              key={nickname}
              nickname={nickname}
              online={false}
              isConfigMode={isConfigMode}
            />
          ))}
        </Div>
      </InfinityScroll>
    </FriendListStyle>
  );
}
