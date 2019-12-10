import React from 'react';
import PropTypes from 'prop-types';
import { PreparationStyle, RoomSettingStyle } from './Preparation.style';
import UserList from './UserList/UserList';
import Anchor from './Anchor/Anchor';
import GameSetting from './GameSetting/GameSetting';

Preparation.propTypes = {
  waitingUserList: PropTypes.arrayOf(
    PropTypes.shape({
      nickname: PropTypes.string,
      socketId: PropTypes.string,
      avatar: PropTypes.number,
    }),
  ).isRequired,
};

export default function Preparation({ waitingUserList }) {
  return (
    <>
      <PreparationStyle>
        <RoomSettingStyle>
          <GameSetting />
          <UserList waitingUserList={waitingUserList} />
        </RoomSettingStyle>
        <Anchor />
      </PreparationStyle>
    </>
  );
}
