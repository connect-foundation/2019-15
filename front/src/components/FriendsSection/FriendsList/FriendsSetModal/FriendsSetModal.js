import React, { useState, useContext } from 'react';

import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import Modal from 'components/globalComponents/Modal/Modal';
import Button from 'components/globalComponents/Button/Button';
import Div from 'components/globalComponents/Modal/ContentDiv.style';
import message from 'constant/messages';
import { deleteFriend, sendFriendRequest } from 'queries/friend';
import GlobalContext from 'global.context';
import { emitRequestFriend } from 'logics/socketLogic/online';
import ButtonSectionStyle from './ButtonSection.style';

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

export default function FriendsSetModal({
  mode,
  nickname,
  modalOff,
  setRefresh,
}) {
  const [content, switchContent] = useState(mode);
  const [deleteFriendFunc] = useMutation(deleteFriend);
  const { onlineSocket, user } = useContext(GlobalContext);
  const [sendFriendRequestFunc] = useMutation(sendFriendRequest, {
    onCompleted({ sendFriendRequest: { user: receiver, result } }) {
      if (!result || !onlineSocket) return;
      emitRequestFriend(onlineSocket, { sender: user, receiver });
    },
  });

  async function clickHandler() {
    if (content === 'empty' || content === 'addDone') modalOff();
    else if (nickname === '') switchContent('empty');
    else if (content === 'add') {
      switchContent('addDone');
      await sendFriendRequestFunc({
        variables: { nickname },
      });
    } else if (content === 'delete') {
      switchContent('deleteDone');
      await deleteFriendFunc({ variables: { nickname } });
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
}
