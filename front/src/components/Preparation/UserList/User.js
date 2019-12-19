import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import GlobalContext from 'global.context';
import crown from 'asset/crown.png';
import { getAvatar } from 'utils/catchmymind/avatar';
import { UserStyle, RoomOwner, Text, Avatar } from './UserList.style';

User.propTypes = {
  user: PropTypes.shape({
    nickname: PropTypes.string,
    socketId: PropTypes.string,
    avatar: PropTypes.number,
    isRoomOwner: PropTypes.bool,
  }).isRequired,
};

export default function User({ user }) {
  const { gameSocket } = useContext(GlobalContext);
  return (
    <UserStyle>
      <Avatar src={getAvatar(user.avatar)} />
      <Text isRoomOwner={user.isRoomOwner} title={user.nickname}>
        <RoomOwner src={crown} />
        {user.nickname}
      </Text>
      <Text>{gameSocket.id === user.socketId ? 'You' : ''}</Text>
    </UserStyle>
  );
}
