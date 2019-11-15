import React from 'react';
import NavigationBarStyle from './NavigationBar.style';
import mainlogo from '../../asset/mainlogo.png';
import Image from '../globalComponents/Image/Image';
import LogOutButton from './LogOutButton/LogOutButton';

const NavigationBar = () => (
  <NavigationBarStyle>
    <Image src={mainlogo} />
    <LogOutButton />
  </NavigationBarStyle>
);

export default NavigationBar;
