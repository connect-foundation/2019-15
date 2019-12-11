import React, { useContext } from 'react';
import FriendsSectionContext from 'components/FriendsSection/refactor/FriendsSection.context';
import { faMinusCircle, faCircle } from '@fortawesome/free-solid-svg-icons';
import {
  ComponentStyle,
  CircleStyle,
  Icon,
} from 'components/FriendsSection/refactor/FriendList/Component/Component.style';

export default function Component({ nickname, online, isConfigMode }) {
  const { dispatchModalContent } = useContext(FriendsSectionContext);

  function makeModalContent() {
    dispatchModalContent({ type: 'delete', nickname: 'deletedOne' });
  }

  return (
    <ComponentStyle>
      <span>{nickname}</span>
      <CircleStyle icon={faCircle} online={online} />
      {isConfigMode ? (
        <Icon icon={faMinusCircle} onClick={makeModalContent} />
      ) : null}
    </ComponentStyle>
  );
}
