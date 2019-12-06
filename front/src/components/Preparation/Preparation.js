import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { initUserListMsgHandler } from 'logics/socketLogic';
import GlobalContext from 'global.context';
import { PreparationStyle, RoomSettingStyle } from './Preparation.style';
import UserList from './UserList/UserList';
import Anchor from './Anchor/Anchor';

Preparation.propTypes = {
  setIsGamePlaying: PropTypes.func.isRequired,
  userList: PropTypes.arrayOf(
    PropTypes.shape({ nickname: PropTypes.string, socketId: PropTypes.string }),
  ).isRequired,
  setUserList: PropTypes.func.isRequired,
};

export default function Preparation({
  setIsGamePlaying,
  userList,
  setUserList,
}) {
  const { gameSocket } = useContext(GlobalContext);

  useEffect(() => {
    initUserListMsgHandler(gameSocket, { setUserList });
  }, [gameSocket, setUserList]);

  return (
    <>
      <PreparationStyle>
        <RoomSettingStyle>
          <UserList userList={userList} />
        </RoomSettingStyle>
        <Anchor />
      </PreparationStyle>
    </>
  );
}
