import React from 'react';
import ChangeMyInfoStyle from './ChangeMyInfo.style';
import ChangeNickname from '../ChangeNickname/ChangeNickname';
import ChangeCharacter from '../ChangeCharacter/ChangeCharacter';

const ChangeMyInfo = () => {
  return (
    <ChangeMyInfoStyle id="ChangeMyInfo">
      <ChangeCharacter />
      <div>
        <ChangeNickname />
      </div>
    </ChangeMyInfoStyle>
  );
};

export default ChangeMyInfo;
