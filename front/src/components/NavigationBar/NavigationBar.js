import React from 'react';
import NavigationBarStyle from './NavigationBar.style';
import mainlogo from '../../asset/mainlogo.png';
import Image from '../globalComponents/Image/Image';
import NavigationBarButton from './NavigationBarButton/NavigationBarButton';

const NavigationBar = () => (
  <NavigationBarStyle>
    <Image src={mainlogo} />
    <NavigationBarButton />
  </NavigationBarStyle>
);

export default NavigationBar;
