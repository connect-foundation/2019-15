import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import globalMessages from 'constant/messages';
import MessageComponentStyle from './MessageComponent.style';
import Button from '../globalComponents/Button/Button';
import ButtonDiv from './ButtonDiv.style';

Message.propTypes = {
  nickname: PropTypes.string,
  acceptRequest: PropTypes.func,
  declineRequest: PropTypes.func,
};

Message.defaultProps = {
  nickname: '',
  acceptRequest: () => {},
  declineRequest: () => {},
};

export default function Message({ nickname, acceptRequest, declineRequest }) {
  return (
    <MessageComponentStyle key={nickname}>
      {nickname}
      {globalMessages.recieveRequest}
      <ButtonDiv>
        <Button onClick={acceptRequest}>수락</Button>
        <Button onClick={declineRequest}>거절</Button>
      </ButtonDiv>
    </MessageComponentStyle>
  );
}
