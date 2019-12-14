import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import Message from 'components/globalComponents/Message/Message';
import {
  ACCEPT_FRIEND_REQUEST,
  DELETE_FRIEND_REQUEST,
} from 'queries/beforeFriend';

FriendRequest.propTypes = {
  id: PropTypes.number.isRequired,
  nickname: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired,
};

export default function FriendRequest({ id, nickname, remove }) {
  const [deleteFriendRequest] = useMutation(DELETE_FRIEND_REQUEST, {
    onCompleted() {
      remove();
    },
  });

  const [acceptFriendRequest] = useMutation(ACCEPT_FRIEND_REQUEST, {
    onCompleted() {
      remove();
    },
  });

  const acceptRequest = async () => {
    await acceptFriendRequest({ variables: { id, nickname } });
  };

  const declineRequest = async () => {
    await deleteFriendRequest({
      variables: { id, nickname },
    });
  };
  return (
    <Message
      content={`${nickname}님이 친구 요청을 하였습니다.`}
      acceptRequest={acceptRequest}
      declineRequest={declineRequest}
    />
  );
}
