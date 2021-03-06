import React, { useState } from 'react';
import Button from '../Button/Button';
import Modal from './Modal';

const ModalUsage = () => {
  const [open, setOpen] = useState(false);

  const modalOn = () => {
    setOpen(true);
  };

  const modalOff = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={modalOn}>모달 키기</Button>
      {open ? (
        <Modal>
          <Button onClick={modalOff}>모달 끄기</Button>
        </Modal>
      ) : null}
    </>
  );
};

export default ModalUsage;
