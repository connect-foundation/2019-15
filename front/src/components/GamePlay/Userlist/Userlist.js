import React, { useContext } from 'react';
import GamePlayContext from 'components/GamePlay/GamePlay.context';
import GlobalContext from 'global.context';
import UserListStyle from './Userlist.style';

import User from './User/User';

export default function UserList() {
  const { gameSocket } = useContext(GlobalContext);
  // const { userList, painter, scores } = useContext(GamePlayContext);
  const { gameState } = useContext(GamePlayContext);
  const { userList, painter, scores } = gameState;

  const UserComponents = userList.map((user, index) => {
    const order = index + 1;
    const className = user.socketId === gameSocket.id ? 'you' : '';
    const drawer = user.socketId === painter;
    const score = scores.length
      ? scores.find(({ socketId }) => socketId === user.socketId).score
      : 0;

    const painterIndex = userList.findIndex(
      (user_) => user_.socketId === painter,
    );
    const leftTurn =
      index <= painterIndex
        ? painterIndex - index
        : painterIndex + (userList.length - 1 - index) + 1;

    return (
      <User
        key={order}
        className={className}
        nickname={user.nickname}
        privileged={user.privileged}
        index={order}
        avatar={user.avatar}
        drawer={drawer}
        score={score}
        leftTurn={leftTurn}
      />
    );
  });

  return <UserListStyle>{UserComponents}</UserListStyle>;
}
