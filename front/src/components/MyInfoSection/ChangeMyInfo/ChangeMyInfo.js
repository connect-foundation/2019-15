import React from 'react';
import ChangeMyInfoStyle from './ChangeMyInfo.style';
import NicknameChangeContainer from './NicknameChangeContainer/NicknameChangeContainer';
import ChangeAvatar from '../ChangeAvatar/ChangeAvatar';

export default function ChangeMyInfo() {
  return (
    <ChangeMyInfoStyle id="ChangeMyInfo">
      <ChangeAvatar />
      <div>
        <NicknameChangeContainer />
      </div>
    </ChangeMyInfoStyle>
  );
}
