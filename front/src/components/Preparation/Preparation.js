import React from 'react';

import { PreparationStyle, RoomSettingStyle } from './Preparation.style';
import Setting from './Setting/Setting';
import UserList from './UserList/UserList';
import Anchor from './Anchor/Anchor';

const Preparation = () => {
  return (
    <>
      <PreparationStyle>
        <RoomSettingStyle>
          <Setting />
          <UserList />
        </RoomSettingStyle>
        <Anchor />
      </PreparationStyle>
    </>
  );
};

export default Preparation;
