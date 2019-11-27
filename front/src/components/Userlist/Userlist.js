import React, { useContext } from 'react';
import UserListStyle from './Userlist.style';
import GamePlayContext from '../../GamePlay.context';

import User from './User/User';

const UserList = () => {
  const { userList } = useContext(GamePlayContext);
  const UserComponents = userList.map((user, index) => (
    <User nickname={user.nickname} index={index + 1} />
  ));

  return <UserListStyle>{UserComponents}</UserListStyle>;
};

export default UserList;
