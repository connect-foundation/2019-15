import React, { useReducer, useContext } from 'react';
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
import FriendModal from 'components/FriendsSection/refactor/FriendList/FriendModal/FriendModal';
import modalReducer from 'components/FriendsSection/refactor/FriendList/modalReducer';
import FriendsSectionContext from 'components/FriendsSection/refactor/FriendsSection.context';

function changeModeReducer(state, action) {
  return !action.current;
}

export default function FriendList() {
  const { onlineFriends } = useContext(FriendsSectionContext);
  const [isConfigMode, changeMode] = useReducer(changeModeReducer, false);
  const { data, loading, error, fetchMore, hasMore, refetch } = useCursorQuery(
    GET_FRIENDS,
  );
  const [modalContent, dispatchModalContent] = useReducer(modalReducer, {
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
          <Div>
            {data.map(({ sFriend: { id, nickname } }) => (
              <Component
                key={nickname}
                nickname={nickname}
                online={onlineFriends[id]}
                isConfigMode={isConfigMode}
                dispatchModalContent={dispatchModalContent}
              />
            ))}
          </Div>
        </InfinityScroll>
      </FriendListStyle>
    </>
  );
}

