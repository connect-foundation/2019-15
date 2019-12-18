import React from 'react';
import PropTypes from 'prop-types';
import { AvatarImage } from './Avatar.style';
import { getAvatar } from 'logics/avatar';

AvatarImg.propTypes = {
  avatarIdx: PropTypes.number,
};

AvatarImg.defaultProps = {
  avatarIdx: 0,
};

export default function AvatarImg({ avatarIdx }) {
  return <AvatarImage src={getAvatar(avatarIdx)} />;
}
