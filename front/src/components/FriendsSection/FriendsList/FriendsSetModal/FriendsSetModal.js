import React from 'react';
import Modal from '../../../globalComponents/Modal/Modal';
import Button from '../../../globalComponents/Button/Button';
import Div from './Div.style';
import ButtonSection from './ButtonSection.style';

const FriendsSetModal = ({ mode, nickname, modalOff }) => (
  <Modal>
    <Div>
      <span>
        {nickname === ''
          ? '원하시는 닉네임을 입력해주세요.'
          : mode === 'add'
            ? `${nickname}님에게 친구 요청을 보내시겠습니까?`
            : `${nickname}님을 친구에서 삭제하시겠습니까?`}
      </span>
      <ButtonSection>
        <Button onClick={modalOff}>확인</Button>
        <Button onClick={modalOff}>취소</Button>
      </ButtonSection>
    </Div>
  </Modal>
);

export default FriendsSetModal;
