import React from 'react';
import { MessageListStyle } from 'components/NavigationBar/DefaultNavBtnContainer/Notice/MessageList/MessageList.style';
import Loading from 'components/globalComponents/Loading/Loading';
import Alert from 'components/globalComponents/Alert/Alert';
import Message from 'components/NavigationBar/DefaultNavBtnContainer/Notice/MessageList/Message/Message';
import { DELETE_INVITATION, GET_INVITATIONS } from 'queries/invitation';
import useCursorQuery from 'hooks/useCursorQuery';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';

export default function MessageList() {
  const history = useHistory();
  const { data, loading, error, refetch } = useCursorQuery(GET_INVITATIONS);
  const [deleteInvitation] = useMutation(DELETE_INVITATION, {
    onCompleted: () => {
      refetch();
    },
  });

  if (loading) return <Loading Wrapper={MessageListStyle} />;
  if (error) return <Alert type="error" Wrapper={MessageListStyle} />;
  if (!data.length) return <Alert type="noData" Wrapper={MessageListStyle} />;

  return (
    <MessageListStyle>
      {data.map(({ id, url, Friend: { pFriend } }) => (
        <Message
          content={`${pFriend.nickname}님이 게임에 초대하였습니다.`}
          acceptRequest={() => history.push(url)}
          declineRequest={() => deleteInvitation({ variables: { id } })}
          key={pFriend.id}
        />
      ))}
    </MessageListStyle>
  );
}
