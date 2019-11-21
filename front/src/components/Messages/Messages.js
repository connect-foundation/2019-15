import React from 'react';
import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import {
  findFriendRequests,
  deleteFriendRequest,
  acceptFriendRequest,
} from '../../queries/friend';
import MessagesStyle from './Messages.style';
import MessageComponentStyle from './MessageComponent.style';
import Button from '../globalComponents/Button/Button';
import Modal from '../globalComponents/Modal/Modal';
import Div from '../globalComponents/Modal/ContentDiv.style';
import globalMessages from '../../logics/messages';
import ButtonDiv from './ButtonDiv.style';

const testId = 5;

function MessageList() {
  const [openModal, setOpenModal] = useState(false);
  const [friendRequests, setFriendRequests] = useState([]);
  const [findFriendRequestsFunc] = useMutation(findFriendRequests, {
    onCompleted({ findFriendRequests }) {
      setFriendRequests(findFriendRequests);
    },
  });
  const [deleteFriendRequestFunc] = useMutation(deleteFriendRequest, {
    onCompleted() {
      findFriendRequestsFunc({ variables: { id: testId } });
    },
  });
  const [acceptFriendRequestFunc] = useMutation(acceptFriendRequest, {
    onCompleted(data) {
      deleteFriendRequestFunc({
        variables: { id: testId, nickname: data.acceptFriendRequest.nickname },
      });
    },
  });

  async function declineRequest(nickname) {
    await deleteFriendRequestFunc({ variables: { id: testId, nickname } });
  }

  async function acceptRequest(nickname) {
    await acceptFriendRequestFunc({ variables: { id: testId, nickname } });
    setOpenModal(true);
  }

  useEffect(() => {
    const fetch = async () => {
      await findFriendRequestsFunc({ variables: { id: testId } });
    };
    fetch();
  }, [findFriendRequestsFunc]);

  return (
    <>
      <MessagesStyle>
        {friendRequests.map((friend) => (
          <MessageComponentStyle key={friend.nickname}>
            {friend.nickname}
            {globalMessages.recieveRequest}
            <ButtonDiv>
              <Button onClick={() => acceptRequest(friend.nickname)}>
                수락
              </Button>
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
