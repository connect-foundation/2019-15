import React, { useContext } from 'react';
import UserListStyle from './Userlist.style';
import GamePlayContext from '../../GamePlay.context';
import GlobalContext from '../../global.context';

import User from './User/User';

function createClassName(myId, comapreId, painterId) {
  let ret = '';
  if (myId === comapreId) ret += 'you';
  if (myId === painterId) ret += ' painter';

  return ret;
}

const UserList = () => {
  const { io } = useContext(GlobalContext);
  const { userList, painter } = useContext(GamePlayContext);
  const UserComponents = userList.map((user, index) => {
    const order = index + 1;
    const className = createClassName(user.socketId, io.socket.id, painter);
    return (
      <User className={className} nickname={user.nickname} index={order} />
    );
  });

  return <UserListStyle>{UserComponents}</UserListStyle>;
};

export default UserList;
