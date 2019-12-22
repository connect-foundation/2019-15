import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'components/globalComponents/Avatar/Avatar';
import { AvatarSettingStyle } from './Setting.style';

AvatarContainer.propTypes = {
  avatar: PropTypes.number.isRequired,
  clickLeftBtn: PropTypes.func.isRequired,
  clickRightBtn: PropTypes.func.isRequired,
};

export default function AvatarContainer({
  avatar,
  clickLeftBtn,
  clickRightBtn,
}) {
  return (
    <AvatarSettingStyle>
      아바타
      <Avatar
        avatar={avatar}
        clickLeftBtn={clickLeftBtn}
        clickRightBtn={clickRightBtn}
      />
    </AvatarSettingStyle>
  );
}
