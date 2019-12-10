import React from 'react';
import PropTypes from 'prop-types';
import getCharacter from 'logics/avatar';
import { AvatarImage } from './Setting.style';

AvatarImg.propTypes = {
  avatarIdx: PropTypes.number,
};

AvatarImg.defaultProps = {
  avatarIdx: 0,
};

export default function AvatarImg({ avatarIdx }) {
  const image = getCharacter(avatarIdx);
  return <AvatarImage src={image} />;
}
