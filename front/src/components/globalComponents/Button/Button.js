import React from 'react';
import ButtonStyle from './Button.style';

const Button = (props) => (
    <ButtonStyle value={props.value} onClick={props.onClick}/>
  );
  
  export default Button;
  