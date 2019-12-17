import React, { useMemo } from 'react';
import useCursorQuery from 'hooks/useCursorQuery';
import { GET_FRIENDS } from 'queries/friend';
import Loading from 'components/globalComponents/Loading/Loading';
import Alert from 'components/globalComponents/Alert/Alert';
import Friend from 'components/Preparation/FriendList/Friend/Friend';
import InfinityScroll from 'components/globalComponents/InfinityScroll/InfinityScroll';
import useOnlineFriends from 'hooks/Online/useOnlineFriends';
import { FriendListStyle } from './FriendList.style';

export default function FriendList() {
  const { data, loading, error, hasMore, fetchMore } = useCursorQuery(
    GET_FRIENDS,
  );

  const friends = useMemo(
    () => (data ? data.map(({ sFriend }) => sFriend) : null),
    [data],
  );

  const [onlineFriends] = useOnlineFriends(friends);

  if (loading) return <Loading Wrapper={FriendListStyle} />;
  if (error) return <Alert type="error" Wrapper={FriendListStyle} />;
  if (!data || !data.length)
    return <Alert type="noData" Wrapper={FriendListStyle} />;

  return (
    <FriendListStyle>
      <InfinityScroll hasMore={hasMore} loadMore={fetchMore}>
        {data.map(({ sFriend: { id, nickname } }) => (
          <Friend
            key={id}
            nickname={nickname}
            id={id}
            online={!!onlineFriends[id]}
          />
        ))}
      </InfinityScroll>
    </FriendListStyle>
  );
}
