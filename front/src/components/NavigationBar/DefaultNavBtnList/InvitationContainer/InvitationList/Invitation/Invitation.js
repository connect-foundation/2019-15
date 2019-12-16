import React from 'react';
import PropTypes from 'prop-types';
import { DELETE_INVITATION } from 'queries/invitation';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import Message from 'components/globalComponents/Message/Message';

Invitation.propTypes = {
  id: PropTypes.number.isRequired,
  nickname: PropTypes.string.isRequired,
  roomId: PropTypes.string.isRequired,
  remove: PropTypes.func,
};

Invitation.defaultProps = {
  remove: () => {},
};

export default function Invitation({ id, nickname, roomId, remove }) {
  const history = useHistory();
  const [deleteInvitation] = useMutation(DELETE_INVITATION, {
    onCompleted: () => {
      remove();
    },
  });

  const acceptInvitation = () => {
    history.push(`setting:${roomId}`);
  };
  const declineInvitation = async () => {
    await deleteInvitation({ variables: { id } });
  };
  return (
    <Message
      content={`${nickname}님이 게임에 초대하였습니다.`}
      acceptRequest={acceptInvitation}
      declineRequest={declineInvitation}
    />
  );
}
