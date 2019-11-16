import React from 'react';
import BackgroundModalStyle from './BackgroundModal.style';
import ModalStyle from './Modal.style';

function Modal(props) {
  return (
    <>
      <BackgroundModalStyle>
        <ModalStyle>{props.children}</ModalStyle>
      </BackgroundModalStyle>
    </>
  );
}

export default Modal;
