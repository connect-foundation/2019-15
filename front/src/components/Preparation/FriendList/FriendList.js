import React from 'react';
import useCursorQuery from 'hooks/useCursorQuery';
import { GET_FRIENDS } from 'queries/friend';
import Loading from 'components/globalComponents/Loading/Loading';
import Alert from 'components/globalComponents/Alert/Alert';
import Friend from 'components/Preparation/FriendList/Friend/Friend';
import InfinityScroll from 'components/globalComponents/InfinityScroll/InfinityScroll';
import { FriendListStyle } from './FriendList.style';

export default function FriendList() {
  const { data, loading, error, hasMore, fetchMore } = useCursorQuery(
    GET_FRIENDS,
  );

  if (loading) return <Loading Wrapper={FriendListStyle} />;
  if (error) return <Alert type="error" Wrapper={FriendListStyle} />;
  if (!data.length) return <Alert type="noData" Wrapper={FriendListStyle} />;

  return (
    <FriendListStyle>
      <InfinityScroll hasMore={hasMore} loadMore={fetchMore}>
        {data.map(({ sFriend: { nickname } }) => (
          <Friend key={nickname} nickname={nickname} />
        ))}
      </InfinityScroll>
    </FriendListStyle>
  );
}
