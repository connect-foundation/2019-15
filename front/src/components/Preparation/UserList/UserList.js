import React, { useContext, useEffect } from 'react';
import UserListStyle from './UserList.style';
import GamePlayContext from '../../../GamePlay.context';
import GlobalContext from '../../../global.context';

// import GameContext from '../../'
const UserList = () => {
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
    <div style={{ width: '40px', height: '40px', backgroundColor: 'yellow' }}>
      {user.nickname}
    </div>
  ));

  return <UserListStyle>{UserComponents}</UserListStyle>;
};

export default UserList;
