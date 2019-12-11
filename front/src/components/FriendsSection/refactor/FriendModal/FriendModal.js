import React, { useContext } from 'react';
import FriendsSectionContext from 'components/FriendsSection/refactor/FriendsSection.context';
import makeModal from 'components/globalComponents/Modal/Modal';
import Button from 'components/globalComponents/Button/Button';
import { ButtonSection } from 'components/FriendsSection/refactor/FriendModal/FriendModal.style';

export default function FriendModal() {
  const { modalContent, dispatchModalContent } = useContext(
    FriendsSectionContext,
  );

  function clearModalContent() {
    dispatchModalContent({ type: 'clear' });
  }

  const Body = () => <span>{modalContent.content}</span>;
  const Footer = () => (
    <ButtonSection>
      <Button onClick={clearModalContent}>확인</Button>
      <Button onClick={clearModalContent}>취소</Button>
    </ButtonSection>
  );

  const Modal = makeModal(null, Body, Footer);

  return <>{modalContent.content ? <Modal /> : null}</>;
}
