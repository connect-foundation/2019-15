import React, { useContext } from 'react';
import GlobalContext from 'global.context';
import { CurrentMyInfoStyle, AvatarImage } from './CurrentMyInfo.style';
import { getAvatar } from 'logics/avatar';

export default function CurrentMyInfo() {
  const { user } = useContext(GlobalContext);

  return (
    <CurrentMyInfoStyle id="CurrentMyInfo">
      <AvatarImage alt="avatar" src={getAvatar(user.avatar)} />
      <div>
        <span className="user-card nickname">닉네임</span>
        <span className="user-card ranking">랭킹 xxx위</span>
      </div>
    </CurrentMyInfoStyle>
  );
}
