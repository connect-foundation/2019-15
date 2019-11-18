import React from 'react';
import AutoLoginStyle from './AutoLogin.style';
import setAutoLogIn from '../../../logics/setAutoLogIn';

const AutoLogin = () => (
  <>
    <label>
        <AutoLoginStyle type="checkbox" onClick={setAutoLogIn}/>
      자동 로그인
    </label>
  </>
);

export default AutoLogin;
