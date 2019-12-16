import React from 'react';
import PropTypes from 'prop-types';
import useAvatar from 'hooks/Avatar/useAvatar';

AvatarImg.propTypes = {
  avatarIdx: PropTypes.number,
};

AvatarImg.defaultProps = {
  avatarIdx: 0,
};

export default function AvatarImg({ avatarIdx }) {
  const [avatarRef] = useAvatar(avatarIdx);
  return <div ref={avatarRef} />;
}
