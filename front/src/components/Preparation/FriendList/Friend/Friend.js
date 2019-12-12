import React from 'react';
import SpectreButton from 'components/globalComponents/SpectreButton/SpectreButton';
import PropTypes from 'prop-types';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FriendStyle, PlayIconStyle } from './Friend.style';

Friend.propTypes = {
  nickname: PropTypes.string,
};

Friend.defaultProps = {
  nickname: '',
};

export default function Friend({ nickname }) {
  return (
    <FriendStyle>
      <span>{nickname}</span>
      <SpectreButton>
        <PlayIconStyle icon={faPlay} />
      </SpectreButton>
    </FriendStyle>
  );
}
