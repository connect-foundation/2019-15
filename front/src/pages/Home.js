import React, { useEffect } from 'react';
import LoginSection from 'components/LoginSection/LoginSection';
import { checkAutoLogIn, getAutoLogIn } from 'utils/catchmymind/auth';
import Background from 'components/globalComponents/Container/Background.style';
import Logo from 'components/Logo/Logo';
import { FlexColumnStyle } from 'components/globalComponents/Container/Flex.style';

const Home = () => {
  useEffect(() => {
    if (getAutoLogIn()) checkAutoLogIn();
  });

  return (
    <Background>
      <FlexColumnStyle>
        <Logo />
        <LoginSection />
      </FlexColumnStyle>
    </Background>
  );
};

export default Home;
