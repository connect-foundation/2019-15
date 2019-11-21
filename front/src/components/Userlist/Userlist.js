import React, { useContext } from 'react';
import UserlistStyle from './Userlist.style';
import GlobalContext from '../../global.context';
import User from './User/User';

const Userlist = () => {
  const { userlist } = useContext(GlobalContext);

  const UserComponents = userlist.map((user, index) => (
    <User nickname={user} index={index + 1} />
  ));

  return <UserlistStyle>{UserComponents}</UserlistStyle>;
};

export default Userlist;
