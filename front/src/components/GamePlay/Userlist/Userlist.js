import React, { useContext } from 'react';
import GamePlayContext from 'components/GamePlay/GamePlay.context';
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
  const { gameSocket } = useContext(GlobalContext);
  const { userList, painter } = useContext(GamePlayContext);
  const UserComponents = userList.map((user, index) => {
    const order = index + 1;
    const className = createClassName(user.socketId, gameSocket.id, painter);
    return (
      <User
        key={order}
        className={className}
        nickname={user.nickname}
        privileged={user.privileged}
        index={order}
      />
    );
  });

  return <UserListStyle>{UserComponents}</UserListStyle>;
}
