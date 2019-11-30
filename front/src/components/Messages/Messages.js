import React, { useState, useEffect } from 'react';

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
import globalMessages from '../../constant/messages';
import ButtonDiv from './ButtonDiv.style';

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
      findFriendRequestsFunc();
    },
  });
  const [acceptFriendRequestFunc] = useMutation(acceptFriendRequest, {
    onCompleted(data) {
      deleteFriendRequestFunc({
        variables: { nickname: data.acceptFriendRequest.nickname },
      });
    },
  });

  async function declineRequest(nickname) {
    await deleteFriendRequestFunc({ variables: { nickname } });
  }

  async function acceptRequest(nickname) {
    await acceptFriendRequestFunc({ variables: { nickname } });
    setOpenModal(true);
  }

  useEffect(() => {
    const fetch = async () => {
      await findFriendRequestsFunc();
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
