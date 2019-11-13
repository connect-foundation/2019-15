import React from 'react';
import { BackgroundModalStyle, ModalStyle } from './Modal.style';

function Modal(props) {
  return (
    <>
      <BackgroundModalStyle isVisible={props.isVisible}>
        <ModalStyle isVisible={props.isVisible}>{props.children}</ModalStyle>
      </BackgroundModalStyle>
    </>
  );
}

export default Modal;
