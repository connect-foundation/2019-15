import React from 'react';
import NavigationBarStyle from './NavigationBar.style';
import mainlogo from '../../asset/mainlogo.png';
import Image from '../globalComponents/Image/Image';

const NavigationBar = () => (
  <NavigationBarStyle>
    <Image src={mainlogo} />
  </NavigationBarStyle>
);

export default NavigationBar;
