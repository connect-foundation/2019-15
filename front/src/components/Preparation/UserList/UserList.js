import React, { useContext, useEffect } from 'react';
import GlobalContext from 'global.context';
import { initUserListMsgHandler } from 'logics/socketLogic';
import UserListStyle from './UserList.style';

export default function UserList() {
  const { gameSocket } = useContext(GlobalContext);

  const UserComponents = [].map((user) => (
    <div style={{ width: '40px', height: '40px' }}>{user.nickname}</div>
  ));

  return <UserListStyle>{UserComponents}</UserListStyle>;
}
