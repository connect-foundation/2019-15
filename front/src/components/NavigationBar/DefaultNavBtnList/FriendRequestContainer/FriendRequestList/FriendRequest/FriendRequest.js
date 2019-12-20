import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import Message from 'components/globalComponents/Message/Message';
import {
  ACCEPT_FRIEND_REQUEST,
  DELETE_FRIEND_REQUEST,
} from 'queries/beforeFriend';
import GlobalContext from 'global.context';
import NO_FRIEND_REQUEST from 'constants/friendRequestError';

FriendRequest.propTypes = {
  id: PropTypes.number.isRequired,
  nickname: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired,
};

export default function FriendRequest({ id, nickname, remove }) {
  const { onlineSocket } = useContext(GlobalContext);
  const [deleteFriendRequest] = useMutation(DELETE_FRIEND_REQUEST, {
    onCompleted() {
      remove();
    },
    onError({ graphQLErrors }) {
      if (graphQLErrors && graphQLErrors[0].message === NO_FRIEND_REQUEST)
        remove();
    },
  });

  const [acceptFriendRequest] = useMutation(ACCEPT_FRIEND_REQUEST, {
    onCompleted({ acceptFriendRequest: friend }) {
      onlineSocket.emit('acceptFriendRequest', friend);
      remove();
    },
  });

  const acceptRequest = async () => {
    await acceptFriendRequest({ variables: { id } });
  };

  const declineRequest = async () => {
    await deleteFriendRequest({
      variables: { id },
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
