import React, { useContext } from 'react';
import UserlistStyle from './Userlist.style';
import MainContext from '../../Main.context';
import User from './User/User';

const Userlist = () => {
  const { userlist } = useContext(MainContext);

  const UserComponents = userlist.map((user, index) => (
    <User nickname={user} index={index + 1} />
  ));

  return <UserlistStyle>{UserComponents}</UserlistStyle>;
};

export default Userlist;
