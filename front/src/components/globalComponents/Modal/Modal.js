import React from 'react';
import PropTypes from 'prop-types';
import BackgroundModalStyle from './BackgroundModal.style';
import ModalStyle from './Modal.style';

function Modal({ children }) {
  return (
    <>
      <BackgroundModalStyle>
        <ModalStyle>{children}</ModalStyle>
      </BackgroundModalStyle>
    </>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
};

Modal.defaultProps = {
  children: null,
};

export default Modal;
