import React, { useContext } from 'react';
import GlobalContext from 'global.context';
import useAvatar from 'hooks/Avatar/useAvatar';
import CurrentMyInfoStyle from './CurrentMyInfo.style';

export default function CurrentMyInfo() {
  const { user } = useContext(GlobalContext);

  const [avatarRef] = useAvatar(user.avatar);

  return (
    <CurrentMyInfoStyle id="CurrentMyInfo">
      <div alt="character" ref={avatarRef} />
      <div>
        <span className="user-card nickname">닉네임</span>
        <span className="user-card ranking">랭킹 xxx위</span>
      </div>
    </CurrentMyInfoStyle>
  );
}
