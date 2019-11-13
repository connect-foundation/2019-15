import React from 'react';
import { useState } from 'react';
import Button from '../Button/Button';
import Modal from './Modal';

const ModalUsage = (props) => {
  const [state, setState] = useState(false);

  function ChangeState(changeState) {
    setState(changeState);
  }

  return (
    <>
      <Button
        onClick={() => {
          ChangeState(true);
        }}
      >
        모달 키기
      </Button>
      <Modal isVisible={state}>
        <Button
          onClick={() => {
            ChangeState(false);
          }}
        >
          모달 끄기
        </Button>
      </Modal>
    </>
  );
};

export default ModalUsage;
