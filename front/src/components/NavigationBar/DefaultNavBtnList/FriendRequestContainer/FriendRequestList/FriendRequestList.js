import React from 'react';
import { MessageListStyle } from 'components/globalComponents/Message/MessageList.style';
import Loading from 'components/globalComponents/Loading/Loading';
import Alert from 'components/globalComponents/Alert/Alert';
import useCursorQuery from 'hooks/useCursorQuery';
import { GET_FRIEND_REQUESTS } from 'queries/beforeFriend';
import FriendRequest from 'components/NavigationBar/DefaultNavBtnList/FriendRequestContainer/FriendRequestList/FriendRequest/FriendRequest';
import InfinityScroll from 'components/globalComponents/InfinityScroll/InfinityScroll';
import { FriendRequestListStyle } from 'components/NavigationBar/DefaultNavBtnList/FriendRequestContainer/FriendRequestList/FriendRequestList.style';

export default function FriendRequestList() {
  const { data, setData, loading, error, hasMore, fetchMore } = useCursorQuery(
    GET_FRIEND_REQUESTS,
  );

  if (loading) return <Loading Wrapper={MessageListStyle} />;
  if (error) return <Alert type="error" Wrapper={MessageListStyle} />;
  if (!data || !data.length)
    return <Alert type="noData" Wrapper={MessageListStyle} />;

  return (
    <MessageListStyle>
      <InfinityScroll hasMore={hasMore} loadMore={fetchMore}>
        <FriendRequestListStyle>
          {data.map(({ pFriend: { id, nickname } }, idx) => (
            <FriendRequest
              nickname={nickname}
              id={id}
              key={id}
              remove={() =>
                setData((prevData) => {
                  prevData.splice(idx, 1);
                  return [...prevData];
                })
              }
            />
          ))}
        </FriendRequestListStyle>
      </InfinityScroll>
    </MessageListStyle>
  );
}
