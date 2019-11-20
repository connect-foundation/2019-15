import React from 'react';
import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import friendQuery from '../../queries/friend';
import MessagesStyle from './Messages.style';
import MessageComponentStyle from './MessageComponent.style';
import Button from '../globalComponents/Button/Button';
import Modal from '../globalComponents/Modal/Modal';
import Div from '../globalComponents/Modal/ContentDiv.style';
import globalMessages from '../../logics/messages';
import ButtonDiv from './ButtonDiv.style';

function MessageList() {
  const [openModal, setOpenModal] = useState(false);
  const [friendRequests, setFriendRequests] = useState([]);
  const [findFriendRequests] = useMutation(friendQuery.findFriendRequests, {
    onCompleted({ findFriendRequests }) {
      setFriendRequests(findFriendRequests);
    },
  });
  const [deleteFriendRequest] = useMutation(friendQuery.deleteFriendRequest, {
    onCompleted() {
      findFriendRequests({ variables: { id: 5 } });
    },
  });

  async function declineRequest(nickname) {
    await deleteFriendRequest({ variables: { id: 5, nickname } });
  }

  useEffect(() => {
    const fetch = async () => {
      await findFriendRequests({ variables: { id: 5 } });
    };
    fetch();
  }, [findFriendRequests]);

  return (
    <>
      <MessagesStyle>
        {friendRequests.map((friend) => (
          <MessageComponentStyle key={friend.nickname}>
            {friend.nickname}
            {globalMessages.recieveRequest}
            <ButtonDiv>
              <Button onClick={() => setOpenModal(true)}>수락</Button>
              <Button onClick={() => declineRequest(friend.nickname)}>
                거절
              </Button>
            </ButtonDiv>
          </MessageComponentStyle>
        ))}
      </MessagesStyle>
      {openModal ? (
        <Modal>
          <Div>
            {globalMessages.acceptRequest}
            <Button onClick={() => setOpenModal(false)}>확인</Button>
          </Div>
        </Modal>
      ) : null}
    </>
  );
}

export default MessageList;
