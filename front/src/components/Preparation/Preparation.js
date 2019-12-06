import React from 'react';
import PropTypes from 'prop-types';
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
