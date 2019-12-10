import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import GlobalContext from 'global.context';
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
};

export default function Preparation({ waitingUserList }) {
  const { user } = useContext(GlobalContext);
  return (
    <>
      <PreparationStyle>
        <RoomSettingStyle>
          <GameSetting
            roomOwner={user.roomOwner}
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
