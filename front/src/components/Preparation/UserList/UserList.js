import React from 'react';
import PropTypes from 'prop-types';
import User from './User';
import { UserListStyle } from './UserList.style';

UserList.propTypes = {
  waitingUserList: PropTypes.arrayOf(
    PropTypes.shape({
      nickname: PropTypes.string,
      socketId: PropTypes.string,
      avatar: PropTypes.number,
    }),
  ).isRequired,
};

export default function UserList({ waitingUserList }) {
  const UserComponents = waitingUserList.map((user) => (
    <User key={user.socketId} user={user} />
  ));

  return <UserListStyle>{UserComponents}</UserListStyle>;
}
