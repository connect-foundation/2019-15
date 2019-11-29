import React from 'react';
import Preparation from '../../components/Preparation/Preparation';
import Background from '../../components/globalComponents/Container/Background.style';
import NavigationBar from '../../components/NavigationBar/NavigationBar';

const GamePreparation = () => {
  return (
    <>
      <NavigationBar />
      <Background>
        <Preparation />
      </Background>
    </>
  );
};

export default GamePreparation;
