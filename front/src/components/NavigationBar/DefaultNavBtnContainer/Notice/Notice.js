import React, { useReducer, useEffect } from 'react';
import Alarm from 'components/NavigationBar/DefaultNavBtnContainer/Notice/Alarm';
import Messages from 'components/Messages/Messages';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { NavImageStyle } from 'components/NavigationBar/DefaultNavBtnContainer/DefaultNavBtnContainer.style';
import useAlarm from 'hooks/Alarm/useAlarm';

const noticeTypeReducer = (state, action) => {
  if (action.type !== 'alarm') {
    return { isOpen: !state.isOpen, type: action.type };
  }
  if (!action.open) return { isOpen: false, type: action.type };

  if (state.isOpen) return state;
  if (!state.type) return { type: action.type };
  return { isOpen: true, type: action.type };
};

const alarmListReducer = (state, action) => {
  switch (action.type) {
    case 'push':
      return [...state, action.value];
    case 'pop':
      state.pop();
      return [...state];
    default:
      throw new Error('wrong action type');
  }
};

export default function Notice() {
  const [alarmList, alarmListDispatch] = useReducer(alarmListReducer, []);
  useAlarm(alarmListDispatch);

  useEffect(() => {
    noticeDispatch({ open: true, type: 'alarm' });
    const timeoutToCloseAlarm = setTimeout(() => {
      noticeDispatch({ open: false, type: 'alarm' });
    }, 2000);
    return () => {
      clearTimeout(timeoutToCloseAlarm);
    };
  }, [alarmList]);

  const [notice, noticeDispatch] = useReducer(noticeTypeReducer, {
    isOpen: false,
    type: null,
  });

  let noticeElement = null;
  if (notice.isOpen) {
    noticeElement =
      notice.type === 'alarm' ? <Alarm alarmList={alarmList} /> : <Messages />;
  }

  const toggleMessages = () => {
    noticeDispatch({ type: 'messages' });
  };

  return (
    <>
      <NavImageStyle icon={faBell} onClick={toggleMessages} />
      {noticeElement}
    </>
  );
}
