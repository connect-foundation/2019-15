import React from 'react';
import useAlarm from 'hooks/Alarm/useAlarm';
import {
  NoticeStyle,
  NotificationStyle,
} from 'components/NavigationBar/DefaultNavBtnList/Notification/Notification.style';

export default function Notification() {
  const [alarm] = useAlarm();
  return (
    <NotificationStyle>
      {Object.entries(alarm).map(([key, message]) => (
        <NoticeStyle key={key}>{message}</NoticeStyle>
      ))}
    </NotificationStyle>
  );
}
