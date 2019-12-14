import React from 'react';
import { MessageListStyle } from 'components/globalComponents/Message/MessageList.style';
import Loading from 'components/globalComponents/Loading/Loading';
import Alert from 'components/globalComponents/Alert/Alert';
import { GET_INVITATIONS } from 'queries/invitation';
import useCursorQuery from 'hooks/useCursorQuery';
import Invitation from 'components/NavigationBar/DefaultNavBtnList/InvitationContainer/InvitationList/Invitation/Invitation';
import { InvitationListStyle } from 'components/NavigationBar/DefaultNavBtnList/InvitationContainer/InvitationList/InvitationList.style';
import InfinityScroll from 'components/globalComponents/InfinityScroll/InfinityScroll';

export default function InvitationList() {
  const { data, setData, loading, error, hasMore, fetchMore } = useCursorQuery(
    GET_INVITATIONS,
  );

  if (loading) return <Loading Wrapper={MessageListStyle} />;
  if (error) return <Alert type="error" Wrapper={MessageListStyle} />;
  if (!data || !data.length)
    return <Alert type="noData" Wrapper={MessageListStyle} />;

  return (
    <MessageListStyle>
      <InfinityScroll hasMore={hasMore} loadMore={fetchMore}>
        <InvitationListStyle>
          {data.map(({ id, roomId, Friend: { pFriend } }, idx) => (
            <Invitation
              id={id}
              roomId={roomId}
              nickname={pFriend.nickname}
              key={id}
              remove={() =>
                setData((prevData) => {
                  prevData.splice(idx, 1);
                  return [...prevData];
                })
              }
            />
          ))}
        </InvitationListStyle>
      </InfinityScroll>
    </MessageListStyle>
  );
}
