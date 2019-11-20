import React from 'react';
import { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import friendQuery from '../../queries/friend';
import MessagesStyle from './Messages.style';
import MessageComponentStyle from './MessageComponent.style';
import Button from '../globalComponents/Button/Button';
import Modal from '../globalComponents/Modal/Modal';
import Div from '../globalComponents/Modal/ContentDiv.style';
import globalMessages from '../../logics/messages';
import ButtonDiv from './ButtonDiv.style';

function MessageList() {
  const [isOpen, setOpen] = useState(false);

  const { loading, data, error } = useQuery(friendQuery.findFriendRequests, {
    variables: { id: 5 },
  });
  if (loading) {
    return <MessagesStyle>loading</MessagesStyle>;
  }
  if (error) {
    return <MessagesStyle>error</MessagesStyle>;
  }

  return (
    <>
      <MessagesStyle>
        {data.findFriendRequests.map((friend) => (
          <MessageComponentStyle key={friend.nickname}>
            {friend.nickname}
            {globalMessages.recieveRequest}
            <ButtonDiv>
              <Button onClick={() => setOpen(true)}>수락</Button>
              <Button>거절</Button>
            </ButtonDiv>
          </MessageComponentStyle>
        ))}
      </MessagesStyle>
      {isOpen ? (
        <Modal>
          <Div>
            {globalMessages.acceptRequest}
            <Button onClick={() => setOpen(false)}>확인</Button>
          </Div>
        </Modal>
      ) : null}
    </>
  );
}

export default MessageList;
