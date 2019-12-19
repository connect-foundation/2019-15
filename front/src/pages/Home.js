import React, { useEffect } from 'react';
import LoginSection from 'components/LoginSection/LoginSection';
import { getAutoLogIn } from 'logics/auth/autoLogIn';
import checkAutoLogIn from 'logics/auth/checkAutoLogIn';
import Background from 'components/globalComponents/Container/Background.style';

const Home = () => {
  useEffect(() => {
    if (getAutoLogIn()) checkAutoLogIn();
  });

  return (
    <Background>
      <LoginSection />
    </Background>
  );
};

export default Home;
