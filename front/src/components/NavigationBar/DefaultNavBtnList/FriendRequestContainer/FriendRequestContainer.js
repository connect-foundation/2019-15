import React, { useState } from 'react';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { NavImageStyle } from 'components/NavigationBar/DefaultNavBtnList/DefaultNavBtnList.style';
import { FriendRequestContainerStyle } from 'components/NavigationBar/DefaultNavBtnList/FriendRequestContainer/FriendRequestContainer.style';
import useCloseClicker from 'hooks/commons/useCloseClicker';
import FriendRequestList from 'components/NavigationBar/DefaultNavBtnList/FriendRequestContainer/FriendRequestList/FriendRequestList';

export default function FriendRequestContainer() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const closeClicker = useCloseClicker(() => {
    setIsOpen(false);
  });

  return (
    <FriendRequestContainerStyle ref={closeClicker}>
      <NavImageStyle icon={faBell} onClick={toggleIsOpen} />
      {isOpen ? <FriendRequestList /> : null}
    </FriendRequestContainerStyle>
  );
}
