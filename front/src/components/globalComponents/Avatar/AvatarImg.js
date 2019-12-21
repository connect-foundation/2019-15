import React from 'react';
import PropTypes from 'prop-types';
import { getAvatar } from 'utils/catchmymind/avatar';
import { AvatarImage } from './Avatar.style';

AvatarImg.propTypes = {
  avatarIdx: PropTypes.number,
};

AvatarImg.defaultProps = {
  avatarIdx: 0,
};

export default function AvatarImg({ avatarIdx }) {
  return <AvatarImage src={getAvatar(avatarIdx)} />;
}
