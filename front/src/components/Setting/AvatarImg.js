import React from 'react';
import PropTypes from 'prop-types';
import character1 from 'asset/character1.png';
import character2 from 'asset/character2.png';
import character3 from 'asset/character3.png';
import { AvatarImage } from './Setting.style';

function getCharacter(index) {
  switch (index) {
    case 0:
      return character1;

    case 1:
      return character2;

    case 2:
      return character3;

    default:
      return null;
  }
}

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
