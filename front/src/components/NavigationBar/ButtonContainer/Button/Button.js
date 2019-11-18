import React from 'react';
import ButtonStyle from './Button.style';

function Button(Image) {
  const RealButton = () => {
    return <ButtonStyle>{Image}</ButtonStyle>;
  };
  return <RealButton />;
}

export default Button;
