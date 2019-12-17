import React, { useReducer } from 'react';
import {
  NoticeStyle,
  NotificationStyle,
} from 'components/NavigationBar/DefaultNavBtnList/Notification/Notification.style';
import useOnlineSocket from 'hooks/Socket/useOnlineSocket';
import uuidv4 from 'uuid/v4';

const alarmReducer = (state, action) => {
  switch (action.type) {
    case 'push':
      return { ...state, ...action.value };
    case 'pop': {
      const { [action.value]: val, ...rest } = state;
      return rest;
    }
    case 'reset':
      return {};
    default:
      throw new Error(`${action.type} is wrong action type`);
  }
};

export default function Notification() {
  const [alarm, alarmDispatch] = useReducer(alarmReducer, {});
  const registerMessage = (message) => {
    const id = uuidv4();
    alarmDispatch({
      type: 'push',
      value: {
        [id]: message,
      },
    });

    setTimeout(() => {
      alarmDispatch({
        type: 'pop',
        value: id,
      });
    }, 2000);
  };
  useOnlineSocket('alarm', registerMessage);
  return (
    <NotificationStyle>
      {Object.entries(alarm).map(([key, message]) => (
        <NoticeStyle key={key}>{message}</NoticeStyle>
      ))}
    </NotificationStyle>
  );
}
