import React from 'react';
import { useState } from 'react';
import Modal from '../../../globalComponents/Modal/Modal';
import Button from '../../../globalComponents/Button/Button';
import Div from './Div.style';
import ButtonSectionStyle from './ButtonSection.style';
import deleteFriend from '../../../../logics/deleteFriend';
import message from '../../../../logics/messages';

const FriendsSetModal = ({ mode, nickname, modalOff }) => {
  const [content, switchContent] = useState(mode);

  async function clickHandler() {
    if (content === 'empty' || content === 'addDone') modalOff();
    else if (nickname === '') switchContent('empty');
    else if (content === 'add') {
      switchContent('addDone');
      // add
    }
    else if (content === 'delete') {
      switchContent('deleteDone');
      await deleteFriend(4, nickname);
    }
    else if (content === 'deleteDone') {
      window.location.href = '/main';
    }
  }

  return (
    <Modal>
      <Div>
        <span>{nickname}{message[content]}</span>
        <ButtonSectionStyle>
          <Button onClick={clickHandler}>확인</Button>
          <Button onClick={modalOff}>취소</Button>
        </ButtonSectionStyle>
      </Div>
    </Modal>
  );
};

export default FriendsSetModal;
