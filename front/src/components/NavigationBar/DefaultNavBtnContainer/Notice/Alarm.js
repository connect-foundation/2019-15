import React from 'react';
import PropTypes from 'prop-types';
import MessagesStyle from 'components/MessageList/Messages.style';
import MessageComponentStyle from 'components/MessageList/MessageComponent.style';

Alarm.propTypes = {
  alarmList: PropTypes.arrayOf(String),
};

Alarm.defaultProps = {
  alarmList: [],
};

export default function Alarm({ alarmList }) {
  return (
    <MessagesStyle>
      {alarmList.map((alarmContent) => {
        return (
          <MessageComponentStyle key={alarmContent}>
            {alarmContent}
          </MessageComponentStyle>
        );
      })}
    </MessagesStyle>
  );
}
