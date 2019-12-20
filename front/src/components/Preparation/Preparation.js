import React from 'react';
import PropTypes from 'prop-types';
import { PreparationStyle, RoomSettingStyle } from './Preparation.style';
import UserList from './UserList/UserList';
import Anchor from './Anchor/Anchor';
import GameSetting from './GameSetting/GameSetting';
import FriendList from './FriendList/FriendList';

Preparation.propTypes = {
  waitingUserList: PropTypes.arrayOf(
    PropTypes.shape({
      nickname: PropTypes.string,
      socketId: PropTypes.string,
      avatar: PropTypes.number,
    }),
  ).isRequired,
  isRoomOwner: PropTypes.bool.isRequired,
};

export default function Preparation({ waitingUserList, isRoomOwner }) {
  return (
    <>
      <PreparationStyle>
        <RoomSettingStyle>
          <GameSetting
            isRoomOwner={isRoomOwner}
            waitingUserList={waitingUserList}
          />
          <FriendList />
          <UserList waitingUserList={waitingUserList} />
        </RoomSettingStyle>
        <Anchor />
      </PreparationStyle>
    </>
  );
}
