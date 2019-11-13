import React from 'react';
import ButtonStyle from './Button.style';

const Button = (props) => (
  <ButtonStyle onClick={props.onClick}>{props.children}</ButtonStyle>
);
export default Button;
