import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import Modal from '../../../globalComponents/Modal/Modal';
import Button from '../../../globalComponents/Button/Button';
import Div from '../../../globalComponents/Modal/ContentDiv.style';
import ButtonSectionStyle from './ButtonSection.style';
import message from '../../../../logics/messages';
import friendQuery from '../../../../queries/friend';

const FriendsSetModal = ({ mode, nickname, modalOff, setRefresh }) => {
  const [content, switchContent] = useState(mode);
  const [deleteFriend] = useMutation(friendQuery.deleteFriend);

  async function clickHandler() {
    if (content === 'empty' || content === 'addDone') modalOff();
    else if (nickname === '') switchContent('empty');
    else if (content === 'add') {
      switchContent('addDone');
      // add
    } else if (content === 'delete') {
      switchContent('deleteDone');
      deleteFriend({ variables: { id: 4, nickname } });
      setRefresh(true);
    } else if (content === 'deleteDone') {
      modalOff();
    }
  }

  return (
    <Modal>
      <Div>
        <span>
          {nickname}
          {message[content]}
        </span>
        <ButtonSectionStyle>
          <Button onClick={clickHandler}>확인</Button>
          <Button onClick={modalOff}>취소</Button>
        </ButtonSectionStyle>
      </Div>
    </Modal>
  );
};

FriendsSetModal.propTypes = {
  mode: PropTypes.string,
  nickname: PropTypes.string,
  modalOff: PropTypes.func,
  setRefresh: PropTypes.func,
};

FriendsSetModal.defaultProps = {
  mode: null,
  nickname: null,
  modalOff: null,
  setRefresh: null,
};

export default FriendsSetModal;
