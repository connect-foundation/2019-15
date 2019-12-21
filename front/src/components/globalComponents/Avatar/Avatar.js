import React from 'react';
import PropTypes from 'prop-types';
import { AvatarChoiceStyle, LeftBtn, RightBtn } from './Avatar.style';
import AvatarImg from './AvatarImg';

Avatar.propTypes = {
  avatar: PropTypes.number,
  clickLeftBtn: PropTypes.func.isRequired,
  clickRightBtn: PropTypes.func.isRequired,
};

Avatar.defaultProps = {
  avatar: 0,
};

export default function Avatar({ avatar, clickLeftBtn, clickRightBtn }) {
  return (
    <AvatarChoiceStyle>
      <LeftBtn onClick={clickLeftBtn}>{'<'}</LeftBtn>
      <AvatarImg avatarIdx={avatar} />
      <RightBtn onClick={clickRightBtn}>{'>'}</RightBtn>
    </AvatarChoiceStyle>
  );
}
