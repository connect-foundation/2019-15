import React from 'react';
import ChangeMyInfoStyle from './ChangeMyInfo.style';
import NicknameChangeContainer from './NicknameChangeContainer/NicknameChangeContainer';
import ChangeCharacter from '../ChangeCharacter/ChangeCharacter';

export default function ChangeMyInfo() {
  return (
    <ChangeMyInfoStyle id="ChangeMyInfo">
      <ChangeCharacter />
      <div>
        <NicknameChangeContainer />
      </div>
    </ChangeMyInfoStyle>
  );
}
