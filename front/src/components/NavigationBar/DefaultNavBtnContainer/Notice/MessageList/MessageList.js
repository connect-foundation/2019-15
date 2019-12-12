import React, { useState, useEffect, useContext } from 'react';

import { useMutation } from '@apollo/react-hooks';
import {
  FIND_FRIEND_REQUESTS,
  DELETE_FRIEND_REQUEST,
  ACCEPT_FRIEND_REQUEST,
} from 'queries/friend';
import globalMessages from 'constant/messages';
import { emitAcceptFriendRequest } from 'logics/socketLogic/online';
import GlobalContext from 'global.context';
import Message from 'components/NavigationBar/DefaultNavBtnContainer/Notice/MessageList/Message/Message';
import { MessageListStyle } from 'components/NavigationBar/DefaultNavBtnContainer/Notice/MessageList/MessageList.style';
import { MessageStyle } from 'components/NavigationBar/DefaultNavBtnContainer/Notice/MessageList/Message/Message.style';
import Button from 'components/globalComponents/Button/Button';
import makeModal from 'components/globalComponents/Modal/Modal';

export default function MessageList() {
  const { onlineSocket } = useContext(GlobalContext);
  const [openModal, setOpenModal] = useState(false);
  const [friendRequests, setFriendRequests] = useState([]);
  const [findFriendRequestsFunc] = useMutation(FIND_FRIEND_REQUESTS, {
    onCompleted({ findFriendRequests }) {
      setFriendRequests(findFriendRequests);
    },
  });
  const [deleteFriendRequestFunc] = useMutation(DELETE_FRIEND_REQUEST, {
    onCompleted() {
      findFriendRequestsFunc();
    },
  });
  const [acceptFriendRequestFunc] = useMutation(ACCEPT_FRIEND_REQUEST, {
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
      <MessageListStyle>
        {friendRequests.length < 1 ? (
          <MessageStyle>새로운 알람이 없습니다.</MessageStyle>
        ) : (
          friendRequests.map(({ nickname }) => (
            <Message
              key={nickname}
              content={`${nickname}${globalMessages.recieveRequest}`}
              acceptRequest={() => acceptRequest(nickname)}
              declineRequest={() => declineRequest(nickname)}
            />
          ))
        )}
      </MessageListStyle>
      {openModal ? <Modal /> : null}
    </>
  );
}
