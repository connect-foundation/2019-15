import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/globalComponents/Button/Button';
import { MessageBtnStyle, MessageStyle } from 'components/NavigationBar/DefaultNavBtnContainer/Notice/MessageList/Message/Message.style';


Message.propTypes = {
  content: PropTypes.string,
  acceptRequest: PropTypes.func,
  declineRequest: PropTypes.func,
};

Message.defaultProps = {
  content: '',
  acceptRequest: () => {},
  declineRequest: () => {},
};

export default function Message({ content, acceptRequest, declineRequest }) {
  return (
    <MessageStyle key={content}>
      {content}
      <MessageBtnStyle>
        <Button onClick={acceptRequest}>수락</Button>
        <Button onClick={declineRequest}>거절</Button>
      </MessageBtnStyle>
    </MessageStyle>
  );
}
