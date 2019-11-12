import React from 'react';
import NavigationBarStyle from './NavigationBar.style';
import mainlogo from '../../asset/mainlogo.png'
import Button from '../globalComponents/Button/Button'
import Image from '../globalComponents/Image/Image';

const NavigationBar = () => {
  return (
    <NavigationBarStyle >
      <Image src={mainlogo}/>
    </NavigationBarStyle>
  )
}

export default NavigationBar;