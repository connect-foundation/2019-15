import React from 'react';
import BackgroundModalStyle from './BackgroundModal.style';
import { ModalStyle, ModalDivStyle } from './Modal.style';

function makeModal(Header, Body, Footer) {
  function Modal() {
    return (
      <BackgroundModalStyle>
        <ModalStyle>
          <ModalDivStyle className="modal-header">
            {Header ? <Header /> : null}
          </ModalDivStyle>
          <ModalDivStyle className="modal-body">
            {Body ? <Body /> : null}
          </ModalDivStyle>
          <ModalDivStyle className="modal-footer">
            {Footer ? <Footer /> : null}
          </ModalDivStyle>
        </ModalStyle>
      </BackgroundModalStyle>
    );
  }

  return Modal;
}

export default makeModal;
