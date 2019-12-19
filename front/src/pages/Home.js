import React, { useEffect } from 'react';
import LoginSection from 'components/LoginSection/LoginSection';
import { checkAutoLogIn, getAutoLogIn } from 'utils/catchmymind/auth';
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
