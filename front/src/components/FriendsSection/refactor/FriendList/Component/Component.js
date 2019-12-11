import React, { useContext } from 'react';
import FriendsSectionContext from 'components/FriendsSection/refactor/FriendsSection.context';
import { faMinusCircle, faCircle } from '@fortawesome/free-solid-svg-icons';
import {
  ComponentStyle,
  CircleStyle,
  Icon,
} from 'components/FriendsSection/refactor/FriendList/Component/Component.style';

export default function Component({ settingMode, online }) {
  const { setModalContent } = useContext(FriendsSectionContext);

  function makeModalContent() {
    setModalContent('삭제하려고?');
  }

  return (
    <ComponentStyle>
      <span>닉네임</span>
      <CircleStyle icon={faCircle} online={online} />
      {settingMode ? (
        <Icon icon={faMinusCircle} onClick={makeModalContent} />
      ) : null}
    </ComponentStyle>
  );
}
