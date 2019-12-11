import React, { useState } from 'react';
import Header from 'components/FriendsSection/refactor/FriendList/Header/Header';
import Component from 'components/FriendsSection/refactor/FriendList/Component/Component';
import { FriendListStyle } from 'components/FriendsSection/refactor/FriendList/FriendList.style';

export default function FriendList() {
  const [settingMode, changeSettingMode] = useState(false);
  return (
    <FriendListStyle>
      <Header settingMode={settingMode} changeSettingMode={changeSettingMode} />
      <Component settingMode={settingMode} online />
      <Component settingMode={settingMode} online={false} />
      <Component settingMode={settingMode} online />
    </FriendListStyle>
  );
}
