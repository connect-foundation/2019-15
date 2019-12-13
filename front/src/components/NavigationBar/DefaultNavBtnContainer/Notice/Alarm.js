import React from 'react';
import PropTypes from 'prop-types';
import { MessageListStyle } from 'components/NavigationBar/DefaultNavBtnContainer/Notice/MessageList/MessageList.style';
import { MessageStyle } from 'components/NavigationBar/DefaultNavBtnContainer/Notice/MessageList/Message/Message.style';

Alarm.propTypes = {
  alarmList: PropTypes.arrayOf(String),
};

Alarm.defaultProps = {
  alarmList: [],
};

export default function Alarm({ alarmList }) {
  return (
    <MessageListStyle>
      {alarmList.map((alarmContent) => {
        return <MessageStyle key={alarmContent}>{alarmContent}</MessageStyle>;
      })}
    </MessageListStyle>
  );
}
