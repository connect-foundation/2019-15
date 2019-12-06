import React from 'react';
import PropTypes from 'prop-types';
import { PreparationStyle, RoomSettingStyle } from './Preparation.style';
import UserList from './UserList/UserList';
import Anchor from './Anchor/Anchor';

Preparation.propTypes = {
  setIsGamePlaying: PropTypes.func.isRequired,
};

export default function Preparation({ setIsGamePlaying }) {
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
