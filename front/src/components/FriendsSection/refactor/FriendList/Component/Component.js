import React from 'react';
import { faMinusCircle, faCircle } from '@fortawesome/free-solid-svg-icons';
import {
  ComponentStyle,
  CircleStyle,
  Icon,
} from 'components/FriendsSection/refactor/FriendList/Component/Component.style';
import PropTypes from 'prop-types';

Component.propTypes = {
  nickname: PropTypes.string,
  online: PropTypes.bool,
  isConfigMode: PropTypes.bool,
  dispatchModalContent: PropTypes.func,
};

Component.defaultProps = {
  nickname: null,
  online: false,
  isConfigMode: false,
  dispatchModalContent: null,
};

export default function Component({
  nickname,
  online,
  isConfigMode,
  dispatchModalContent,
}) {
  function clickDeleteButton() {
    dispatchModalContent({ type: 'deleteRequest', nickname });
  }

  return (
    <ComponentStyle>
      <span>{nickname}</span>
      <CircleStyle icon={faCircle} online={online} />
      {isConfigMode ? (
        <Icon icon={faMinusCircle} onClick={clickDeleteButton} />
      ) : null}
    </ComponentStyle>
  );
}
