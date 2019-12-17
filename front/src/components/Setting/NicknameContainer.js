import React from 'react';
import PropTypes from 'prop-types';
import { NicknameSettingStyle, Nickname, InputWrapper } from './Setting.style';

NicknameContainer.propTypes = {
  onChangeNickname: PropTypes.func.isRequired,
};

export default function NicknameContainer({ onChangeNickname }) {
  return (
    <NicknameSettingStyle>
      닉네임
      <InputWrapper>
        <Nickname onChange={onChangeNickname} maxLength="12" />
      </InputWrapper>
    </NicknameSettingStyle>
  );
}
