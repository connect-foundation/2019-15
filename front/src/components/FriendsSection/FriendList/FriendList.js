import React, { useReducer, useMemo } from 'react';
import Header from 'components/FriendsSection/FriendList/Header/Header';
import Component from 'components/FriendsSection/FriendList/Component/Component';
import Alert from 'components/globalComponents/Alert/Alert';
import {
  FriendListStyle,
  FriendListScrollStyle,
} from 'components/FriendsSection/FriendList/FriendList.style';
import { GET_FRIENDS } from 'queries/friend';
import useCursorQuery from 'hooks/commons/useCursorQuery';
import InfinityScroll from 'components/globalComponents/InfinityScroll/InfinityScroll';
import useOnlineFriends from 'hooks/FriendsSection/useOnlineFriends';
import FriendModal from 'components/FriendsSection/FriendList/FriendModal/FriendModal';
import modalReducer from 'components/FriendsSection/FriendList/modalReducer';

const changeModeReducer = (state) => {
  return !state.current;
};

export default function FriendList() {
  const [isConfigMode, changeMode] = useReducer(changeModeReducer, false);
  const { data, loading, error, fetchMore, hasMore, refetch } = useCursorQuery(
    GET_FRIENDS,
  );

  const friends = useMemo(
    () => (data ? data.map(({ sFriend }) => sFriend) : null),
    [data],
  );

  const [onlineFriends] = useOnlineFriends(friends);

  const [modalContent, dispatchModalContent] = useReducer(modalReducer, {
    id: null,
    content: null,
    nickname: null,
    current: null,
  });

  if (loading) {
    return (
      <FriendListStyle>
        <Header />
      </FriendListStyle>
    );
  }
  if (error || !data) {
    return (
      <FriendListStyle>
        <Header />
        <Alert type="error" />
      </FriendListStyle>
    );
  }

  const switchMode = () => {
    changeMode();
  };
  return (
    <>
      <FriendModal
        modalContent={modalContent}
        dispatchModalContent={dispatchModalContent}
        refetch={refetch}
      />
      <FriendListStyle>
        <Header
          isConfigMode={isConfigMode}
          switchMode={switchMode}
          dispatchModalContent={dispatchModalContent}
        />
        <InfinityScroll loadMore={fetchMore} hasMore={hasMore}>
          <FriendListScrollStyle>
            {data.map(({ sFriend: { id, nickname } }) => (
              <Component
                key={nickname}
                id={id}
                nickname={nickname}
                online={!!onlineFriends[id]}
                isConfigMode={isConfigMode}
                dispatchModalContent={dispatchModalContent}
              />
            ))}
          </FriendListScrollStyle>
        </InfinityScroll>
      </FriendListStyle>
    </>
  );
}
