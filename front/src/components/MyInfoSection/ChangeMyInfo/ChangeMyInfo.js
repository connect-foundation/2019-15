import React from 'react';
import ChangeMyInfoStyle from './ChangeMyInfo.style';
import NicknameChangeContainer from './NicknameChangeContainer/NicknameChangeContainer';
import ChangeCharacter from '../ChangeCharacter/ChangeCharacter';

const ChangeMyInfo = () => {
  return (
    <ChangeMyInfoStyle id="ChangeMyInfo">
      <ChangeCharacter />
      <div>
        <NicknameChangeContainer />
      </div>
    </ChangeMyInfoStyle>
  );
};

export default ChangeMyInfo;
