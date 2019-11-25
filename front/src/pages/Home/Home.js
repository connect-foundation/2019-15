import React, { useEffect } from 'react';
import LoginSection from '../../components/LoginSection/LoginSection';
import { getAutoLogIn } from '../../logics/autoLogIn';
import checkAutoLogIn from '../../logics/checkAutoLogIn';
import HomeStyle from './Home.style';

const Home = () => {
  useEffect(() => {
    if (getAutoLogIn()) checkAutoLogIn();
  });

  return (
    <HomeStyle>
      <LoginSection />
    </HomeStyle>
  );
};

export default Home;
