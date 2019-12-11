import React, { useState } from 'react';
import useOnlineFriends from 'hooks/Online/useOnlineFriends';
import FriendsSectionContext from 'components/FriendsSection/refactor/FriendsSection.context';
import { ListPopUpButton } from 'components/FriendsSection/refactor/FriendsSection.style';
import FriendList from 'components/FriendsSection/refactor/FriendList/FriendList';
import FriendModal from 'components/FriendsSection/refactor/FriendModal/FriendModal';

export default function FriendsSection() {
  const [onlineFriends, onlineFriendsDispatch] = useOnlineFriends();
  const [modalContent, setModalContent] = useState(null);
  const [listOpen, setListOpen] = useState(false);

  function switchListOpen() {
    setListOpen(!listOpen);
  }

  return (
    <FriendsSectionContext.Provider
      value={{
        onlineFriends,
        onlineFriendsDispatch,
        modalContent,
        setModalContent,
      }}
    >
      <FriendModal modalContent={modalContent} />
      {listOpen ? <FriendList /> : null}
      <ListPopUpButton onClick={switchListOpen}>
        {listOpen ? '목록 숨기기' : '친구 목록'}
      </ListPopUpButton>
    </FriendsSectionContext.Provider>
  );
}
