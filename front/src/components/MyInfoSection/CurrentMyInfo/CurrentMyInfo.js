import React, { useContext } from 'react';
import Character from 'components/globalComponents/Character/Character';
import GlobalContext from 'global.context';
import getCharacter from 'logics/avatar';
import CurrentMyInfoStyle from './CurrentMyInfo.style';

export default function CurrentMyInfo() {
  const { user } = useContext(GlobalContext);
  return (
    <CurrentMyInfoStyle id="CurrentMyInfo">
      <Character alt="character" src={getCharacter(user.avatar)} />
      <div>
        <span className="user-card nickname">닉네임</span>
        <span className="user-card ranking">랭킹 xxx위</span>
      </div>
    </CurrentMyInfoStyle>
  );
}
