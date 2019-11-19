import React, {useEffect} from 'react';
import LoginSection from '../components/LoginSection/LoginSection';
import {getAutoLogIn} from '../logics/autoLogIn';
import checkAutoLogIn from '../logics/checkAutoLogIn';

const Home = () => {
  useEffect(() => {
    if (getAutoLogIn()) checkAutoLogIn();
  });

  return (
    <>
      <LoginSection />
    </>
  );
};

export default Home;
