import React, { useContext } from 'react';
import UserlistStyle from './Userlist.style';
import GamePlayContext from '../../pages/GamePlay/GamePlay.context';

import User from './User/User';

const Userlist = () => {
  const { userlist } = useContext(GamePlayContext);
  const UserComponents = userlist.map((user, index) => {
    const order = index + 1;
    return <User nickname={user.nickname} index={order} key={order} />;
  });

  return <UserlistStyle>{UserComponents}</UserlistStyle>;
};

export default Userlist;
