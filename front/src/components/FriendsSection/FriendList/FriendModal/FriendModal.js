import React from 'react';
import makeModal from 'components/globalComponents/Modal/Modal';
import Button from 'components/globalComponents/Button/Button';
import { ButtonSection } from 'components/FriendsSection/FriendList/FriendModal/FriendModal.style';
import PropTypes from 'prop-types';
import useFriendModal from 'hooks/FriendsSection/useFriendModal';

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
  const [clearModalContent, clickOKButton] = useFriendModal({
    modalContent,
    dispatchModalContent,
    refetch,
  });
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
