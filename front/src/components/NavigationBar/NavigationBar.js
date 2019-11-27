import React from 'react';
import { Link } from 'react-router-dom';
import { LogoImage, NavigationBarStyle } from './NavigationBar.style';
import ButtonContainer from './ButtonContainer/ButtonContainer';
import mainlogo from '../../asset/mainlogo4.png';

const NavigationBar = () => (
  <NavigationBarStyle id="NavigationBar">
    <Link to="/main">
      <LogoImage src={mainlogo} />
    </Link>
    <ButtonContainer />
  </NavigationBarStyle>
);

export default NavigationBar;
