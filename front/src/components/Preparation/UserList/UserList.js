import React, { useContext, useEffect } from 'react';
import GamePlayContext from 'pages/GamePlay/GamePlay.context';
import GlobalContext from 'global.context';
import UserListStyle from './UserList.style';

export default function UserList() {
  const { userList, setUserList } = useContext(GamePlayContext);
  const { io } = useContext(GlobalContext);

  useEffect(() => {
    const initSocket = async () => {
      if (io.socket) {
        await io.initUserListMsgHandler({ setUserList });
      }
    };
    initSocket();
  });
  const UserComponents = userList.map((user) => (
    <div style={{ width: '40px', height: '40px' }}>{user.nickname}</div>
  ));

  return <UserListStyle>{UserComponents}</UserListStyle>;
}
