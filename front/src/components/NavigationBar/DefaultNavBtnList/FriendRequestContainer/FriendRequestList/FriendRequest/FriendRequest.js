import React from 'react';
import PropTypes from 'prop-types';
import Message from 'components/globalComponents/Message/Message';
import useFriendRequest from 'hooks/FriendsSection/useFriendRequest';

FriendRequest.propTypes = {
  id: PropTypes.number.isRequired,
  nickname: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired,
};

export default function FriendRequest({ id, nickname, remove }) {
  const [acceptRequest, declineRequest] = useFriendRequest({ id, remove });

  return (
    <Message
      content={`${nickname}님이 친구 요청을 하였습니다.`}
      acceptRequest={acceptRequest}
      declineRequest={declineRequest}
    />
  );
}
