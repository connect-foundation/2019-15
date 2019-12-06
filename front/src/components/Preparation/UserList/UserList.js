import React, { useContext, useEffect } from 'react';
import GamePlayContext from 'components/GamePlay/GamePlay.context';
import GlobalContext from 'global.context';
import { initUserListMsgHandler } from 'logics/socketLogic';
import UserListStyle from './UserList.style';

export default function UserList() {
  const { userList, setUserList } = useContext(GamePlayContext);
  const { gameSocket } = useContext(GlobalContext);

  useEffect(() => {
    const initSocket = async () => {
      if (!gameSocket) return;
      initUserListMsgHandler(gameSocket, { setUserList });
    };
    initSocket();
  });
  const UserComponents = userList.map((user) => (
    <div style={{ width: '40px', height: '40px' }}>{user.nickname}</div>
  ));

  return <UserListStyle>{UserComponents}</UserListStyle>;
}
