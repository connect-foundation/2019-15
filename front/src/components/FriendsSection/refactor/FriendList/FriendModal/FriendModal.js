import React from 'react';
import makeModal from 'components/globalComponents/Modal/Modal';
import Button from 'components/globalComponents/Button/Button';
import { ButtonSection } from 'components/FriendsSection/refactor/FriendList/FriendModal/FriendModal.style';
import PropTypes from 'prop-types';
import { DELETE_FRIEND } from 'queries/friend';
import { useMutation } from '@apollo/react-hooks';

FriendModal.propTypes = {
  modalContent: PropTypes.objectOf(PropTypes.string),
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
  const [deleteFriendRequest] = useMutation(DELETE_FRIEND, {
    onCompleted(result) {
      dispatchModalContent({
        type: 'deleteDone',
        nickname: result.deleteFriend.nickname,
      });
      refetch();
    },
    onError() {
      dispatchModalContent({
        type: 'error',
      });
    },
  });

  function clearModalContent() {
    dispatchModalContent({ type: 'clear' });
  }

  function clickOKButton() {
    switch (modalContent.current) {
      case 'addDone':
      case 'deleteDone':
      case 'error':
        return dispatchModalContent({ type: 'clear' });
      case 'addRequest':
        console.log('친구요청 로직 추가 예정');
        return dispatchModalContent({
          type: 'addDone',
          nickname: modalContent.nickname,
        });
      case 'deleteRequest':
        return deleteFriendRequest({
          variables: { nickname: modalContent.nickname },
        });
      default:
        throw new Error(`${modalContent.current}cannot find current`);
    }
  }

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
