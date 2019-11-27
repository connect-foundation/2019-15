import React, { useContext } from 'react';
import UserListStyle from './Userlist.style';
import GamePlayContext from '../../GamePlay.context';

import User from './User/User';

const UserList = () => {
  const { userList } = useContext(GamePlayContext);
  const UserComponents = userList.map((user, index) => {
    const order = index + 1;
    return <User nickname={user.nickname} index={order} key={order} />;
  });

  return <UserListStyle>{UserComponents}</UserListStyle>;
};

export default UserList;
