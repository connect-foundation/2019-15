import React, { useContext } from 'react';
import makeModal from 'components/globalComponents/Modal/Modal';
import Button from 'components/globalComponents/Button/Button';
import { ButtonSection } from 'components/FriendsSection/FriendList/FriendModal/FriendModal.style';
import PropTypes from 'prop-types';
import { DELETE_FRIEND } from 'queries/friend';
import { useMutation } from '@apollo/react-hooks';
import { SEND_FRIEND_REQUEST } from 'queries/beforeFriend';
import GlobalContext from 'global.context';

FriendModal.propTypes = {
  modalContent: PropTypes.shape({
    id: PropTypes.number,
    current: PropTypes.string,
    nickname: PropTypes.string,
    content: PropTypes.string,
  }),
  dispatchModalContent: PropTypes.func,
  refetch: PropTypes.func,
};

FriendModal.defaultProps = {
  modalContent: null,
  dispatchModalContent: null,
  refetch: null,
};

export default function FriendModal({
  modalContent,
  dispatchModalContent,
  refetch,
}) {
  const { onlineSocket } = useContext(GlobalContext);
  const [deleteFriendRequest] = useMutation(DELETE_FRIEND, {
    onCompleted({ deleteFriend }) {
      onlineSocket.emit('deleteFriend', deleteFriend);
      dispatchModalContent({
        type: 'deleteDone',
        nickname: modalContent.nickname,
      });
      refetch();
    },
    onError() {
      dispatchModalContent({
        type: 'error',
        content: '에러가 발생했습니다.',
      });
    },
  });
  const [sendFriendRequest] = useMutation(SEND_FRIEND_REQUEST, {
    onCompleted({ sendFriendRequest: friend }) {
      onlineSocket.emit('alarm', {
        user: friend,
        message: `${friend.nickname}님이 친구가 되고 싶어해요`,
      });
      dispatchModalContent({
        type: 'addDone',
        nickname: friend.nickname,
      });
    },
    onError({ graphQLErrors }) {
      dispatchModalContent({
        type: 'error',
        content: graphQLErrors[0].message,
      });
    },
  });

  const clearModalContent = () => {
    dispatchModalContent({ type: 'clear' });
  };

  const clickOKButton = () => {
    switch (modalContent.current) {
      case 'addDone':
      case 'deleteDone':
      case 'error':
        return dispatchModalContent({ type: 'clear' });
      case 'addRequest':
        return sendFriendRequest({
          variables: { nickname: modalContent.nickname },
        });
      case 'deleteRequest':
        return deleteFriendRequest({
          variables: { id: modalContent.id },
        });
      default:
        throw new Error(`${modalContent.current}cannot find current`);
    }
  };

  const Body = () => <span>{modalContent.content}</span>;
  const Footer = () => (
    <ButtonSection>
      <Button onClick={clickOKButton}>확인</Button>
      <Button onClick={clearModalContent}>취소</Button>
    </ButtonSection>
  );

  const Modal = makeModal(null, Body, Footer);

  return <>{modalContent.content ? <Modal /> : null}</>;
}
