import React from 'react';
import { Link } from 'react-router-dom';
import { NavigationBarStyle, LogoImage } from './NavigationBar.style';
import ButtonContainer from './ButtonContainer/ButtonContainer';
import mainlogo from '../../asset/mainlogo.png';

const NavigationBar = () => (
  <NavigationBarStyle>
    <Link to="/main">
      <LogoImage src={mainlogo} />
    </Link>
    <ButtonContainer />
  </NavigationBarStyle>
);

export default NavigationBar;
