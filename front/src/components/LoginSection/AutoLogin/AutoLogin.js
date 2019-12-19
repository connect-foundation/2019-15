import React from 'react';
import {
  autoLoginCheckboxEventHandler,
  getAutoLogIn,
} from 'utils/catchmymind/auth';
import AutoLoginStyle from './AutoLogin.style';

export default function AutoLogin() {
  return (
    <>
      <label>
        <AutoLoginStyle
          type="checkbox"
          onClick={autoLoginCheckboxEventHandler}
          defaultChecked={getAutoLogIn()}
        />
        자동 로그인
      </label>
    </>
  );
}
