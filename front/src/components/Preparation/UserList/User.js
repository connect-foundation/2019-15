import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import GlobalContext from 'global.context';
import crown from 'asset/crown.png';
import useAvatar from 'hooks/Avatar/useAvatar';
import { UserStyle, RoomOwner, Text } from './UserList.style';

User.propTypes = {
  user: PropTypes.shape({
    nickname: PropTypes.string,
    socketId: PropTypes.string,
    avatar: PropTypes.number,
    roomOwner: PropTypes.bool,
  }).isRequired,
};

export default function User({ user }) {
  const { gameSocket } = useContext(GlobalContext);
  const [avatarRef] = useAvatar(user.avatar);
  return (
    <UserStyle>
      <div ref={avatarRef} />
      <Text roomOwner={user.roomOwner} title={user.nickname}>
        <RoomOwner src={crown} />
        {user.nickname}
      </Text>
      <Text>{gameSocket.id === user.socketId ? 'You' : ''}</Text>
    </UserStyle>
  );
}
