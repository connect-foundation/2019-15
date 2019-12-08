import React, { useState, useEffect, useContext } from 'react';

import { useMutation } from '@apollo/react-hooks';
import {
  findFriendRequests,
  deleteFriendRequest,
  acceptFriendRequest,
} from 'queries/friend';
import globalMessages from 'constant/messages';
import { emitAcceptFriendRequest } from 'logics/socketLogic/online';
import GlobalContext from 'global.context';
import MessagesStyle from './Messages.style';
import MessageComponentStyle from './MessageComponent.style';
import Button from '../globalComponents/Button/Button';
import makeModal from '../globalComponents/Modal/Modal';
import Div from '../globalComponents/Modal/ContentDiv.style';
import ButtonDiv from './ButtonDiv.style';

export default function MessageList() {
  const { onlineSocket } = useContext(GlobalContext);
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
    onCompleted({ acceptFriendRequest: { user, result } }) {
      if (!result) return;
      emitAcceptFriendRequest(onlineSocket, user);
      deleteFriendRequestFunc({
        variables: { nickname: user.nickname },
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

  const closeModal = () => setOpenModal(false);
  const Body = () => <div>{globalMessages.acceptRequest}</div>;
  const Footer = () => <Button onClick={closeModal}>확인</Button>;
  const Modal = makeModal(null, Body, Footer);
  return (
    <>
      <MessagesStyle>
        {friendRequests.length < 1 ? (
          <MessageComponentStyle>새로운 알람이 없습니다.</MessageComponentStyle>
        ) : (
          friendRequests.map((friend) => (
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
          ))
        )}
      </MessagesStyle>
      {openModal ? <Modal /> : null}
    </>
  );
}
