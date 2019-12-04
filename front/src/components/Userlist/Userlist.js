import React, { useContext } from 'react';
import GamePlayContext from 'pages/GamePlay/GamePlay.context';
import GlobalContext from 'global.context';
import UserListStyle from './Userlist.style';

import User from './User/User';

function createClassName(myId, comapreId, painterId) {
  let ret = '';
  if (myId === comapreId) ret += 'you';
  if (myId === painterId) ret += ' painter';

  return ret;
}

export default function UserList() {
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
}
