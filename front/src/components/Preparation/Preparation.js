import React from 'react';
import { PreparationStyle, RoomSettingStyle } from './Preparation.style';
import UserList from './UserList/UserList';
import Anchor from './Anchor/Anchor';

export default function Preparation() {
  return (
    <>
      <PreparationStyle>
        <RoomSettingStyle>
          <UserList />
        </RoomSettingStyle>
        <Anchor />
      </PreparationStyle>
    </>
  );
}
