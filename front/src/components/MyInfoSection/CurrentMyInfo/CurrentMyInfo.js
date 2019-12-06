import React from 'react';
import character1 from 'asset/character1.png';
import Character from 'components/globalComponents/Character/Character';
import CurrentMyInfoStyle from './CurrentMyInfo.style';

export default function CurrentMyInfo() {
  return (
    <CurrentMyInfoStyle id="CurrentMyInfo">
      <Character alt="character" src={character1} />
      <div>
        <span className="user-card nickname">닉네임</span>
        <span className="user-card ranking">랭킹 xxx위</span>
      </div>
    </CurrentMyInfoStyle>
  );
}
