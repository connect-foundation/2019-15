import React, { useState } from 'react';
import { NavImageStyle } from 'components/NavigationBar/DefaultNavBtnList/DefaultNavBtnList.style';
import { faGamepad } from '@fortawesome/free-solid-svg-icons';
import { FriendRequestContainerStyle } from 'components/NavigationBar/DefaultNavBtnList/FriendRequestContainer/FriendRequestContainer.style';
import useCloseClicker from 'hooks/useCloseClicker';
import InvitationList from 'components/NavigationBar/DefaultNavBtnList/InvitationContainer/InvitationList/InvitationList';

export default function InvitationContainer() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };
  const closeClicker = useCloseClicker(() => {
    setIsOpen(false);
  });

  return (
    <FriendRequestContainerStyle ref={closeClicker}>
      <NavImageStyle icon={faGamepad} onClick={toggleIsOpen} />
      {isOpen ? <InvitationList /> : null}
    </FriendRequestContainerStyle>
  );
}
