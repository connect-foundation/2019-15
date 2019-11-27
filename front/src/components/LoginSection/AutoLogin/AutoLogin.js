import React from 'react';
import AutoLoginStyle from './AutoLogin.style';
import {autoLoginCheckboxEventHandler, getAutoLogIn} from '../../../logics/autoLogIn';

const AutoLogin = () => (
  <>
    <label>
        <AutoLoginStyle type="checkbox" onClick={autoLoginCheckboxEventHandler} defaultChecked={getAutoLogIn()}/>
      자동 로그인
    </label>
  </>
);

export default AutoLogin;
