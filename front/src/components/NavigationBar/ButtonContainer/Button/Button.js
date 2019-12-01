import React from 'react';
import ButtonStyle from './Button.style';

export default function Button(Image) {
  const RealButton = () => {
    return <ButtonStyle>{Image}</ButtonStyle>;
  };
  return <RealButton />;
}
