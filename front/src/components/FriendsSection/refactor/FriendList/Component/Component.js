import React from 'react';
import { faMinusCircle, faCircle } from '@fortawesome/free-solid-svg-icons';
import {
  ComponentStyle,
  CircleStyle,
  Icon,
} from 'components/FriendsSection/refactor/FriendList/Component/Component.style';
import PropTypes from 'prop-types';

Component.propTypes = {
  id: PropTypes.number.isRequired,
  nickname: PropTypes.string.isRequired,
  online: PropTypes.bool,
  isConfigMode: PropTypes.bool,
  dispatchModalContent: PropTypes.func,
};

Component.defaultProps = {
  online: false,
  isConfigMode: false,
  dispatchModalContent: null,
};

export default function Component({
  id,
  nickname,
  online,
  isConfigMode,
  dispatchModalContent,
}) {
  function clickDeleteButton() {
    dispatchModalContent({ type: 'deleteRequest', id, nickname });
  }

  return (
    <ComponentStyle>
      <span>{nickname}</span>
      <CircleStyle icon={faCircle} isonline={online ? 1 : 0} />
      {isConfigMode ? (
        <Icon icon={faMinusCircle} onClick={clickDeleteButton} />
      ) : null}
    </ComponentStyle>
  );
}
