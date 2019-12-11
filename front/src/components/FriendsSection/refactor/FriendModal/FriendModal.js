import React, { useContext } from 'react';
import FriendsSectionContext from 'components/FriendsSection/refactor/FriendsSection.context';
import makeModal from 'components/globalComponents/Modal/Modal';
import Button from 'components/globalComponents/Button/Button';
import { ButtonSection } from 'components/FriendsSection/refactor/FriendModal/FriendModal.style';

export default function FriendModal() {
  const { modalContent, setModalContent } = useContext(FriendsSectionContext);

  function clearModalContent() {
    setModalContent(null);
  }

  const Body = () => <span>{modalContent}</span>;
  const Footer = () => (
    <ButtonSection>
      <Button onClick={clearModalContent}>확인</Button>
      <Button onClick={clearModalContent}>취소</Button>
    </ButtonSection>
  );

  const Modal = makeModal(null, Body, Footer);

  return <>{modalContent !== null ? <Modal /> : null}</>;
}
